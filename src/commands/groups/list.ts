import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class GroupsList extends Command {
    static description = 'List User groups'

    static flags = {
        harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
        harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
    }

    async run() {
        const { flags } = this.parse(GroupsList)

        const harness = new Harness({ accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })
        await harness.init()


        const result = await harness.groups.list()
        this.log(JSON.stringify(result, undefined, 4))
    }
}
