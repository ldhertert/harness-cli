import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class UsersGet extends Command {
    static description = 'Get users'

    static args = [
        { name: 'user', description: 'The email, name, or id of the user', required: true },
    ]

    static flags = {
        harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
        harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
    }

    async run() {
        const { args, flags } = this.parse(UsersGet)

        const harness = new Harness({ accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })
        await harness.init()

        const result = await harness.users.get(args.user)
        this.log(JSON.stringify(result, undefined, 4))
    }
}
