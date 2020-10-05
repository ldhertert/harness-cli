import { Command } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class ApplicationsGet extends Command {
  static description = 'Get an application'

  static args = [
      { name: 'nameOrId', description: 'The name or id of the application', required: true },
  ]

  static flags = {
  }

  async run() {
      const { args } = this.parse(ApplicationsGet)

      const harness = new Harness({
          accountId: process.env.HARNESS_ACCOUNT || '',
          apiKey: process.env.HARNESS_API_KEY || '',
      })

      const app = await harness.applications.get(args.nameOrId)
      this.log(JSON.stringify(app, undefined, 4))
  }
}
