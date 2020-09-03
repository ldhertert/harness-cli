import { Variable } from './variables'
import { Step } from './steps'
import { File, FileSystem } from '../../util/filesystem'

export interface TemplateRef {
    source: string
}

export interface TemplateExecutionContext {
    cwd: string,
    vars: any,
    context: any,
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

    public constructor(name: string) {
        this.name = name
        this.sourceFiles = []
        this.variables = []
        this.steps = []
    }

    public async execute(inputVars: any): Promise<void> {
        // Create workspace
        const fs = new FileSystem()
        const cwd = await fs.mktemp()
        const context: TemplateExecutionContext = {
            cwd: cwd,
            vars: inputVars,
            context: {},
            workspace: [],
            outputs: {},
        }

        // Process variables
        // 4) Load user provided variables
        // 5) Merge user provided variables with template variables with default values
        // 6) Evaluate any templatized variables
        // 7) Perform template variable validation with computed variables values

        // Execute steps
        for (const step of this.steps) {
            await step.run(context)
        }

        // Preview changes

        // Upsert yaml results

        // Validate success

        console.log(JSON.stringify(context, undefined, 4))
        // Cleanup workspace
        // await fs.rmdir(cwd)
    }
}
