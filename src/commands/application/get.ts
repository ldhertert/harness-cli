import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'

export default class ApplicationsGet extends Command {
    static aliases = ['app:get', 'apps:get', 'applications:get', 'application:get']
    static description = 'Get an application'

    static flags = {
        ...Command.flags,
        nameOrId: flags.string({ description: 'The name or id of the application', required: true, char: 'n' }),
    }

    async run() {
        const { flags } = this.parse(ApplicationsGet)

        const harness = await this.getHarnessClient()

        const app = await harness.applications.get(flags.nameOrId)
        this.log(app)
    }
}
