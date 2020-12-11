import { StepType, Step } from '../steps'
import { TemplateExecutionContext } from '../template'
import { LocalStorageProvider } from '../../storage/local-storage'

export type DumpWorkspaceOptions = {
    destination?: string
}

export class DumpWorkspace extends Step {
    type = StepType.DumpWorkspace
    destination?: string

    public constructor(name: string, opts: DumpWorkspaceOptions) {
        super(name, [])
        this.destination = opts.destination
    }

    async run(context: TemplateExecutionContext): Promise<void> {
        if (this.destination) {
            context.logger.log(`Writing workspace files to ${this.destination}.`)
            await this.writeToDisk(context, this.destination)
        } else {
            context.workspace.forEach(file => {
                context.logger.log(file.path)
                const regex = /^/gm
                const indentedContent = file.content.replace(regex, '    ')
                context.logger.log(indentedContent)
            })
        }
    }

    async writeToDisk(context: TemplateExecutionContext, destination: string) {
        // dump files to local filesystem for debugging
        const workspaceDump = new LocalStorageProvider({ directory: destination})
        await workspaceDump.init()
        await workspaceDump.storeFiles(context.workspace)
        await workspaceDump.storeFile({ path: 'context.json', content: JSON.stringify({ vars: context.vars, outputs: context.outputs }, undefined, 4) })
        await workspaceDump.dispose()
    }
}