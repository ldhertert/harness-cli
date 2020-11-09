import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'

export default class CloudProviderGet extends Command {
    static aliases = ['cloud-provider:get', 'cloud-providers:get']

    static description = 'Get cloud provider'

    static flags = {
        ...Command.flags,
        nameOrId: flags.string({ description: 'The name or id of the cloud provider', required: true, char: 'n' }),
    }

    async run() {
        const { flags } = this.parse(CloudProviderGet)

        const harness = await this.getHarnessClient()

        const result = await harness.cloudProviders.get(flags.nameOrId)
        this.log(result)
    }
}