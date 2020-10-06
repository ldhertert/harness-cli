import { Variable } from './variables'
import { Step, StepType, FileSourceStep, RenameFileStep, SetValueStep } from './steps'
import { File } from '../../util/filesystem'
import * as _ from 'lodash'
import { StorageProvider } from '../storage/storage-provider'
import { Credentials } from '../../util/config'

export interface TemplateRef {
    source: string
}

export interface TemplateExecutionContext {
    vars: any,
    workspace: File[],
    outputs: any,
    credentials: Credentials[]
}

export class Template {
    name: string
    description?: string
    templateVersion?: string
    schemaVersion?: string
    author?: string
    parentTemplate?: TemplateRef
    sourceFiles: File[]
    variables: Variable[]
    steps: Step[]

    public constructor(inputObj: any) {
        this.name = inputObj.name || ''
        this.sourceFiles = inputObj.sourceFiles || []
        this.variables = inputObj.variables || []
        
        this.steps = []
        for (const step of (inputObj.steps || [])) {
            if (step.type === StepType.FileSource) {
                this.steps.push(new FileSourceStep(step.name, step.source, step.glob))
            } else if (step.type === StepType.RenameFile) {
                this.steps.push(new RenameFileStep(step.name, step.search, step.replace, step.glob))
            } else if (step.type === StepType.SetValue) {
                this.steps.push(new SetValueStep(step.name, step.path, step.value, step.glob))
            } else {
                throw new Error('Invalid step type')
            }
        }
    }

    public async execute(inputVars: any, destination: StorageProvider, credentials: Credentials[]): Promise<TemplateExecutionContext> {
        // Create workspace
        const context: TemplateExecutionContext = {
            vars: {},
            workspace: [],
            outputs: {},
            credentials: credentials,
        }

        this.processVariables(inputVars, context)
        await this.executeTemplateSteps(context)

        // Preview changes

        // Upsert yaml results
        await destination.init()
        console.log('Pushing changes to destination')
        await destination.storeFiles(context.workspace)
        await destination.dispose()
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
