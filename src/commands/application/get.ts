import { BaseCommand as Command } from '../base-command'

export default class ApplicationsGet extends Command {
    static aliases = ['app:get', 'apps:get', 'applications:get', 'application:get']
    static description = 'Get an application'

    static args = [
        { name: 'nameOrId', description: 'The name or id of the application', required: true },
    ]

    static flags = {
        ...Command.flags,
    }

    async run() {
        const { args } = this.parse(ApplicationsGet)

        const harness = await this.getHarnessClient()

        const app = await harness.applications.get(args.nameOrId)
        this.log(app)
    }
}
