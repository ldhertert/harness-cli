import { BaseCommand as Command } from '../base-command'

export default class CloudProviderGet extends Command {
    static aliases = ['cloud-provider:get', 'cloud-providers:get']

    static description = 'Get cloud provider'

    static args = [
        { name: 'nameOrId', description: 'The name or id of the cloud provider', required: true },
    ]

    static flags = {
        ...Command.flags,
    }

    async run() {
        const { args, } = this.parse(CloudProviderGet)

        const harness = await this.getHarnessClient()

        const result = await harness.cloudProviders.get(args.nameOrId)
        this.log(result)
    }
}