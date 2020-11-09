import { BaseCommand as Command } from '../base-command'

export default class CloudProviderDelete extends Command {
    static aliases = ['cloud-provider:delete', 'cloud-providers:delete']

    static description = 'Delete cloud provider'

    static args = [
        { name: 'nameOrId', description: 'The name or id of the cloud provider', required: true },
    ]

    static flags = {
        ...Command.flags,
    }

    async run() {
        const { args } = this.parse(CloudProviderDelete)

        const harness = await this.getHarnessClient()

        await harness.cloudProviders.delete(args.nameOrId)
        this.log('Successfully deleted cloud provider')
    }
}