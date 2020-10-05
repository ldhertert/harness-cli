import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class UsersCreate extends Command {
    static description = 'Create user'

    static args = [
        { name: 'email', description: 'The email of the user', required: true },
        { name: 'name', description: 'The name of the user', required: true },
    ]

    static flags = {
        groups: flags.string({ multiple: true }),
        harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
        harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
    }

    async run() {
        const { args, flags } = this.parse(UsersCreate)

        const harness = new Harness({ accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })

        const groupIds = []
        for (const group of flags.groups) {
            groupIds.push((await harness.groups.get(group)).id)   
        }

        const result = await harness.users.create(args.email, args.name, groupIds)
        this.log(JSON.stringify(result, undefined, 4))
    }
}
