import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../../base-command'

export default class GitConnectorCreate extends Command {
    static aliases = ['connector:create-git', 'connectors:create-git']
    static description = 'Create git connector'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the connector', required: true, char: 'n' }),
        url: flags.string({ description: 'The url for the repository', required: true }),
        username: flags.string({ description: 'The username to be used for git authentication', required: true }),
        passwordSecret: flags.string({ description: 'The name or id of the secret that contains the password to be used for git authentication', required: true }),
        branch: flags.string({ description: 'The git branch name', default: 'master' }),
    }

    async run() {
        const { flags } = this.parse(GitConnectorCreate)

        const harness = await this.getHarnessClient()

        const secret = await harness.secrets.get(flags.passwordSecret)
        const result = await harness.connectors.git.create({
            name: flags.name,
            url: flags.url,
            username: flags.username,
            passwordSecretId: secret.id,
            branch: flags.branch,
        })
        this.log(result)
    }
}
