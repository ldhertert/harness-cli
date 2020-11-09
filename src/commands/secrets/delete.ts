import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'
import { SecretType } from '../../providers/harness/secrets'

export default class SecretsDelete extends Command {
    static aliases = ['secret:delete', 'secrets:delete']
    static description = 'Delete a secret'


    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the secret', char: 'n', exclusive: ['id'] }),
        id: flags.string({ description: 'The id of the secret' }),
        type: flags.enum({ options: [SecretType.Text], required: true, default: SecretType.Text }),
    }

    async run() {
        const { flags } = this.parse(SecretsDelete)

        const harness = await this.getHarnessClient()

        const nameOrId = flags.name || flags.id
        if (!nameOrId) {
            this.error('Either name or id is required.')
        }
        await harness.secrets.delete(nameOrId, flags.type)
        this.log('Successfully deleted secret')
    }
}
