import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../base-command'
import { K8sClusterDetailsType, K8sCloudProviderOptions } from '../../providers/harness/cloud-providers'

export default class CloudProviderCreateK8s extends Command {
    static aliases = ['cloud-provider:create-k8s', 'cloud-providers:create-k8s']

    static description = 'Create a new application'

    static args = [
        { name: 'name', description: 'The name of the application', required: true },
    ]

    static flags = {
        ...Command.flags,
        inheritFromDelegate: flags.string({ description: 'If true, permissions are inherited from the delegate instead of being explicitly provided', exclusive: ['masterUrl'] }),
        masterUrl: flags.string({ description: 'The Kubernetes master node URL. The easiest method to obtain the master URL is using kubectl: kubectl cluster-info', dependsOn: ['serviceAccountTokenSecret'] }),
        serviceAccountTokenSecret: flags.string({ description: 'The name or id of the secret that contains the service account token' }),
        skipValidation: flags.boolean({ description: '', default: false }),
    }

    async run() {
        const { args, flags } = this.parse(CloudProviderCreateK8s)

        const harness = await this.getHarnessClient()

        let options: K8sCloudProviderOptions

        if (flags.inheritFromDelegate) {
            options = {
                clusterDetailsType: K8sClusterDetailsType.Inherit,
                delegateName: flags.inheritFromDelegate,
                skipValidation: flags.skipValidation,
            }
        } else if (flags.masterUrl) {
            if (!flags.serviceAccountTokenSecret) {
                this.error('Missing service account token secret name/id', { exit: 1})
            }

            const serviceAccountTokenSecret = await harness.secrets.get(flags.serviceAccountTokenSecret)

            options = {
                clusterDetailsType: K8sClusterDetailsType.ServiceAccountToken,
                masterUrl: flags.masterUrl,
                serviceAccountToken: serviceAccountTokenSecret.id,
                skipValidation: flags.skipValidation,
            }
        } else {
            throw new Error('Either inherit from delegate or master url is required')
        }

        const result = await harness.cloudProviders.create(args.name, options)
        this.log(result)
    }
}
