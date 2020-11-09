import { BaseCommand as Command } from '../base-command'
import { flags } from '@oclif/command'
import { SecretType } from '../../providers/harness/secrets'

export default class SecretsDelete extends Command {
    static aliases = ['secret:delete', 'secrets:delete']
    static description = 'Delete a secret'

    static args = [
        { name: 'nameOrId', description: 'The name or id of the secret', required: true },
    ]

    static flags = {
        ...Command.flags,
        type: flags.enum({ options: [SecretType.Text], required: true, default: SecretType.Text }),
    }

    async run() {
        const { args, flags } = this.parse(SecretsDelete)

        const harness = await this.getHarnessClient()

        await harness.secrets.delete(args.nameOrId, flags.type)
        this.log('Successfully deleted secret')
    }
}
