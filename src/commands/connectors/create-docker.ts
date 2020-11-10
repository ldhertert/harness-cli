import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../../base-command'

export default class DockerConnectorCreate extends Command {
    static aliases = ['connector:create-docker', 'connectors:create-docker']
    static description = 'Create docker connector'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the connector', required: true, char: 'n' }),
        url: flags.string({ description: 'The url for the docker registry', required: true, default: 'https://index.docker.io/v2/' }),
        username: flags.string({ description: 'The username to be used for authentication' }),
        passwordSecret: flags.string({ description: 'The name or id of the secret that contains the password to be used for docker authentication' }),
        skipExisting: flags.boolean({ description: 'If true, this command will not fail if an resource with the same name already exists.', default: false}),
    }

    async run() {
        const { flags } = this.parse(DockerConnectorCreate)

        const harness = await this.getHarnessClient()

        let secretId:string | undefined
        if (flags.passwordSecret) {
            const secret = await harness.secrets.get(flags.passwordSecret)
            secretId = secret.id
        }
        let result
        try {
            result = await harness.connectors.docker.create({
                name: flags.name,
                url: flags.url,
                username: flags.username,
                passwordSecretId: secretId,
            })
        } catch (err) {
            const existsError = err.errors?.filter((e: { message: string | string[]; }) => e.message.includes('already exists')).length > 0
            if (existsError && flags.skipExisting) {
                this.debug('Connector already exists, but skipExisting is true.')
            } else {
                throw err
            }
        }
        this.log(result)
    }
}
