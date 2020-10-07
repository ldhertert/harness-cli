import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'
import { GitSyncOptions } from '../../providers/harness/applications'

export default class ApplicationsCreate extends Command {
  static description = 'Create a new application'

  static args = [
      { name: 'name', description: 'The name of the application', required: true },
      { name: 'description', description: 'A description of the application'},
  ]

  static flags = {
      syncEnabled: flags.boolean({ description: 'Whether or not git sync should be enabled', dependsOn: ['gitConnector'] }),
      gitConnector: flags.string({ description: 'The name or id of the git connector to use for git sync' }),
      branch: flags.string({ description: 'The branch name to use for git sync' }),
      harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
      harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
  }

  async run() {
      const { args, flags } = this.parse(ApplicationsCreate)

      const harness = new Harness({accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })
      await harness.init()

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
      this.log(JSON.stringify(applications, undefined, 4))
  }
}
