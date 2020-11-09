import { Variable } from './variables'
import { Step, StepType, FileSourceStep, RenameFileStep, SetValueStep, CreateApplicationStep } from './steps'
import { File } from '../../util/filesystem'
import * as _ from 'lodash'
import { Harness, HarnessApiOptions } from '../harness/harness-api-client'
import { HarnessStorageProvider } from '../storage/harness-api-storage'

export interface TemplateRef {
    source: string
}

export interface TemplateExecutionContext {
    vars: any
    workspace: File[]
    outputs: any
    defaultCredentials: {
        harness: HarnessApiOptions
    }
}

/**
 * A template manifest that includes variables, inline source files, and transformation steps
 */
export class Template {
    /** The template name */
    name: string

    /** A description for the template */
    description?: string

    /** The version number of this template */
    templateVersion?: string

    // schemaVersion?: string

    /** The template author */
    author?: string

    // parentTemplate?: TemplateRef

    /** Inline definition of source files to be included in the template execution */
    sourceFiles: File[]

    /** Input variables that a user can define/override at template execution time */
    variables: Variable[]

    /** A list of steps that will be executed sequentially to import source files from external sources and transform source files */
    steps: Step[]

    public constructor(inputObj: any) {
        this.name = inputObj.name || ''
        this.sourceFiles = inputObj.sourceFiles || []
        this.variables = inputObj.variables || []
        
        this.steps = []
        for (const step of (inputObj.steps || [])) {
            const stepFiles: string[] = step.files || []
            if (step.file) {
                stepFiles.push(step.file)
            }
            if (stepFiles.length === 0) {
                stepFiles.push('**/*.yaml')
            }
            if (step.type === StepType.FileSource) {
                this.steps.push(new FileSourceStep(step.name, step.source, stepFiles))
            } else if (step.type === StepType.RenameFile) {
                this.steps.push(new RenameFileStep(step.name, step.search, step.replace, stepFiles))
            } else if (step.type === StepType.SetValue) {
                this.steps.push(new SetValueStep(step.name, step.path, step.value, stepFiles))
            }  else if (step.type === StepType.CreateApplication) {
                this.steps.push(new CreateApplicationStep(step.name, step.applicationName))
            } else {
                throw new Error('Invalid step type')
            }
        }
    }

    public async execute(inputVars: any, destination: Harness, dryRun = false): Promise<TemplateExecutionContext> {
        // Create workspace
        const context: TemplateExecutionContext = {
            vars: {},
            workspace: [],
            outputs: {},
            defaultCredentials: {
                harness: {
                    apiKey: destination.apiKey,
                    accountId: destination.accountId,
                    managerUrl: destination.managerUrl,
                    username: destination.username,
                    password: destination.password,
                },
            },
        }

        this.processVariables(inputVars, context)
        await this.executeTemplateSteps(context)

        // Preview changes

        // Upsert yaml results
        if (!dryRun && context.workspace.length > 0) {
            console.log('Pushing changes to destination')
            const destinationStorage = new HarnessStorageProvider(destination)
            await destinationStorage.init()
            context.outputs.pushFilesResult = await destinationStorage.storeFiles(context.workspace)
            if (context.outputs.pushFilesResult.responseStatus === 'FAILED') {
                throw new Error('Error pushing files to destination.\n' + JSON.stringify(context.outputs.pushFilesResult, undefined, 4))
            }
            
            await destinationStorage.dispose()
        }
        // Validate success

        return context
    }

    private processVariables(inputVars: any, context: TemplateExecutionContext): void{
        // Process variables
        context.vars = inputVars || {}

        // Merge user provided variables with template variables with default values
        const defaults: any = {}
        this.variables.filter(v => v.defaultValue !== undefined)
            .forEach(v => {
                defaults[v.name] = v.defaultValue
            })
        _.defaults(context.vars, defaults)

        // eslint-disable-next-line no-warning-comments
        // TODO: Evaluate any templatized variables

        // Perform template variable validation with computed variables values
        const verificationFailures = this.variables.filter(v => v.required && context.vars[v.name] === undefined)
            .map(v => v.name)

        if (verificationFailures.length > 0) {
            throw new Error(`The following required variables were not provided: ${verificationFailures.join(',')}`)
        }
    }

    private async executeTemplateSteps(context: TemplateExecutionContext) : Promise<void> {
        // Execute steps
        for (const step of this.steps) {
            console.log(`Executing step '${step.name}'`)
            await step.run(context)
        }
    }
}
