import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'

export default class CloudProviderDelete extends Command {
    static aliases = ['cloud-provider:delete', 'cloud-providers:delete']

    static description = 'Delete cloud provider'

    static flags = {
        ...Command.flags,
        nameOrId: flags.string({ description: 'The name or id of the cloud provider', required: true, char: 'n' }),
    }

    async run() {
        const { flags } = this.parse(CloudProviderDelete)

        const harness = await this.getHarnessClient()

        await harness.cloudProviders.delete(flags.nameOrId)
        this.log('Successfully deleted cloud provider')
    }
}