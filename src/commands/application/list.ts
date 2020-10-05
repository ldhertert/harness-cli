import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class ApplicationsList extends Command {
  static description = 'List Applications'

  static flags = {
      harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
      harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
  }

  async run() {
      const { flags } = this.parse(ApplicationsList)

      const harness = new Harness({accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })

      const apps = await harness.applications.list()
      this.log(JSON.stringify(apps, undefined, 4))
  }
}
