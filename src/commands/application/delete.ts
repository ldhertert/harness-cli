import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class ApplicationsDelete extends Command {
  static description = 'Delete an application'

  static args = [
      { name: 'nameOrId', description: 'The current name or id of the application', required: true },
  ]

  static flags = {
      harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
      harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
  }

  async run() {
      const { args, flags } = this.parse(ApplicationsDelete)

      const harness = new Harness({accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })
      await harness.init()

      await harness.applications.delete(args.nameOrId)
      this.log(`Successfully deleted ${args.nameOrId}`)
  }
}
