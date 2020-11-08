import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../base-command'
import { GitSyncOptions } from '../../providers/harness/applications'

export default class ApplicationsUpdate extends Command {
    static aliases = ['app:update', 'apps:update', 'applications:update', 'application:update']

    static description = 'Update an application'

    static args = [
        { name: 'nameOrId', description: 'The current name or id of the application', required: true },
    ]

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The new name of the application.  If omitted, the value will remain unchanged.' }),
        description: flags.string({ description: 'The new description of the application. If omitted, the value will remain unchanged.' }),
        syncEnabled: flags.boolean({ description: 'Whether or not git sync should be enabled. If omitted, the value will remain unchanged.', dependsOn: ['gitConnector'] }),
        gitConnector: flags.string({ description: 'The name or id of the git connector to use for git sync' }),
        branch: flags.string({ description: 'The branch name to use for git sync' }),
    }

    async run() {
        const { args, flags } = this.parse(ApplicationsUpdate)

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

        const applications = await harness.applications.update(args.nameOrId, flags.name, flags.description, gitSyncOptions)
        this.log(applications)
    }
}
