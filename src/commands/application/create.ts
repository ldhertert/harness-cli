import { flags } from '@oclif/command'
import { BaseCommand } from '../base-command'
import { GitSyncOptions } from '../../providers/harness/applications'

export default class ApplicationsCreate extends BaseCommand {
    static aliases = ['app:create', 'apps:create', 'applications:create', 'application:create']

    static description = 'Create a new Harness application'

    static args = [
        { name: 'name', description: 'The name of the application', required: true },
        { name: 'description', description: 'A description of the application' },
    ]

    static flags = {
        ...BaseCommand.flags,
        syncEnabled: flags.boolean({ description: 'Whether or not git sync should be enabled', dependsOn: ['gitConnector'] }),
        gitConnector: flags.string({ description: 'The name or id of the git connector to use for git sync' }),
        branch: flags.string({ description: 'The branch name to use for git sync' }),
    }

    async run() {
        const { args, flags } = this.parse(ApplicationsCreate)

        const harness = await this.getHarnessClient()

        let gitSyncOptions: GitSyncOptions | undefined

        if (flags.syncEnabled && flags.gitConnector) {
            const connector = await harness.connectors.git.get(flags.gitConnector)
            gitSyncOptions = {
                syncEnabled: flags.syncEnabled,
                gitConnectorId: connector.id,
                branch: flags.branch,
            }
        }

        const applications = await harness.applications.create(args.name, args.description, gitSyncOptions)
        this.log(applications)
    }
}
