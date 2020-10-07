import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class GitConnectorCreate extends Command {
    static description = 'Create git connector'

    static args = [
        { name: 'name', description: 'The name of the user', required: true },
        { name: 'url', description: 'The url for the repository', required: true },
    ]

    static flags = {
        username: flags.string({ required: true }),
        passwordSecret: flags.string({ required: true }),
        branch: flags.string({ }),
        harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
        harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
    }

    async run() {
        const { args, flags } = this.parse(GitConnectorCreate)

        const harness = new Harness({ accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })
        await harness.init()

        const secret = await harness.secrets.get(flags.passwordSecret)
        const result = await harness.connectors.git.create({
            name: args.name,
            url: args.url,
            username: flags.username,
            passwordSecretId: secret.id,
            branch: flags.branch,
        })
        this.log(JSON.stringify(result, undefined, 4))
    }
}
