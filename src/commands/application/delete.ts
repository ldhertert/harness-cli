import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'

export default class ApplicationsDelete extends Command {
    static aliases = ['app:delete', 'apps:delete', 'applications:delete', 'application:delete']

    static description = 'Delete an application'

    static flags = {
        ...Command.flags,
        nameOrId: flags.string({ description: 'The name or id of the application', required: true, char: 'n' }),
    }

    async run() {
        const { flags } = this.parse(ApplicationsDelete)
        const harness = await this.getHarnessClient()

        await harness.applications.delete(flags.nameOrId)

        this.log(`Successfully deleted ${flags.nameOrId}`)
    }
}
