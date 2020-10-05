import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class ApplicationsGet extends Command {
  static description = 'Get an application'

  static args = [
      { name: 'nameOrId', description: 'The name or id of the application', required: true },
  ]

  static flags = {
      harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
      harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
  }

  async run() {
      const { args, flags } = this.parse(ApplicationsGet)

      const harness = new Harness({accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })

      const app = await harness.applications.get(args.nameOrId)
      this.log(JSON.stringify(app, undefined, 4))
  }
}
