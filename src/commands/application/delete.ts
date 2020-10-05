import { Command } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class ApplicationsDelete extends Command {
  static description = 'Delete an application'

  static args = [
      { name: 'nameOrId', description: 'The current name or id of the application', required: true },
  ]

  static flags = {
  }

  async run() {
      const { args } = this.parse(ApplicationsDelete)

      const harness = new Harness({
          accountId: process.env.HARNESS_ACCOUNT || '',
          apiKey: process.env.HARNESS_API_KEY || '',
      })

      await harness.applications.delete(args.nameOrId)
      this.log(`Successfully deleted ${args.nameOrId}`)
  }
}
