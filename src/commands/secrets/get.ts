import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'
import { SecretType } from '../../providers/harness/secrets'

export default class SecretsGet extends Command {
    static aliases = ['secret:get', 'secrets:get']
    static description = 'Get Secret By Id or By Name'
    static flags = {
        ...Command.flags,
        name: flags.string({
            description: 'The name of the secret',
            char: 'n',
            exclusive: ['id'],
        }),
        id: flags.string({ description: 'The id of the secret' }),
        type: flags.enum({
            options: [SecretType.Text],
            required: true,
            default: SecretType.Text,
        }),
    };

    async run() {
        const { flags } = this.parse(SecretsGet)
        const harness = await this.getHarnessClient()
        const nameOrId = flags.name || flags.id
        if (!nameOrId) {
            this.error('Either name or id is required.')
        }
        const secret = await harness.secrets.get(nameOrId, flags.type)
        this.log(secret)
    }
}
