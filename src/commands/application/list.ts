import { Command } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class ApplicationsList extends Command {
  static description = 'List Applications'

  async run() {
      const harness = new Harness({
          accountId: process.env.HARNESS_ACCOUNT || '',
          apiKey: process.env.HARNESS_API_KEY || '',
      })

      const apps = await harness.applications.list()
      this.log(JSON.stringify(apps, undefined, 4))
  }
}
