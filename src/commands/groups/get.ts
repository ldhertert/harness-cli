import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class GroupsGet extends Command {
    static description = 'Get user groups'

    static args = [
        { name: 'nameOrId', description: 'The name or id of the user group', required: true },
    ]

    static flags = {
        harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
        harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
    }

    async run() {
        const { args, flags } = this.parse(GroupsGet)

        const harness = new Harness({ accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })
        await harness.init()

        const result = await harness.groups.get(args.nameOrId)
        this.log(JSON.stringify(result, undefined, 4))
    }
}
