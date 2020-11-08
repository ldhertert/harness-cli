import { BaseCommand as Command } from '../base-command'

export default class ApplicationsDelete extends Command {
    static aliases = ['app:delete', 'apps:delete', 'applications:delete', 'application:delete']

    static description = 'Delete an application'

    static args = [
        { name: 'nameOrId', description: 'The current name or id of the application', required: true },
    ]

    static flags = {
        ...Command.flags,
    }

    async run() {
        const { args } = this.parse(ApplicationsDelete)
        const harness = await this.getHarnessClient()

        await harness.applications.delete(args.nameOrId)

        this.log(`Successfully deleted ${args.nameOrId}`)
    }
}
