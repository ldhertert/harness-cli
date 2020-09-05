import { Variable } from './variables'
import { Step } from './steps'
import { File, FileSystem } from '../../util/filesystem'
import * as _ from 'lodash'
import { StorageProvider } from '../storage/storage-provider'

export interface TemplateRef {
    source: string
}

export interface TemplateExecutionContext {
    cwd: string,
    vars: any,
    workspace: File[],
    outputs: any
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

    public constructor(name?: string) {
        this.name = name || ''
        this.sourceFiles = []
        this.variables = []
        this.steps = []
    }

    public async execute(inputVars: any, destination: StorageProvider): Promise<void> {
        // Create workspace
        const fs = new FileSystem()
        const cwd = await fs.mktemp()
        const context: TemplateExecutionContext = {
            cwd: cwd,
            vars: {},
            workspace: [],
            outputs: {},
        }

        this.processVariables(inputVars, context)
        await this.executeTemplateSteps(context)

        // Preview changes

        // Upsert yaml results
        await destination.storeFiles(context.workspace)

        // Validate success

        // Cleanup workspace
        await fs.rmdir(context.cwd)
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
            await step.run(context)
        }
    }
}
