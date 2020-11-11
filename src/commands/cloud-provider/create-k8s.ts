import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../../base-command'
import { K8sClusterDetailsType, K8sCloudProviderOptions } from '../../providers/harness/cloud-providers'
import { Harness } from '../../providers/harness/harness-api-client'

export default class CloudProviderCreateK8s extends Command {
    static aliases = ['cloud-provider:create-k8s', 'cloud-providers:create-k8s']

    static description = 'Create a new application'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the cloud provider', required: true, char: 'n' }),
        inheritFromDelegate: flags.string({ description: 'If true, permissions are inherited from the delegate instead of being explicitly provided', exclusive: ['masterUrl'] }),
        masterUrl: flags.string({ description: 'The Kubernetes master node URL. The easiest method to obtain the master URL is using kubectl: kubectl cluster-info', dependsOn: ['serviceAccountTokenSecret'] }),
        serviceAccountTokenSecret: flags.string({ description: 'The name or id of the secret that contains the service account token' }),
        skipValidation: flags.boolean({ description: '', default: false }),
        skipExisting: flags.boolean({ description: 'If true, this command will not fail if an resource with the same name already exists.', default: false }),
        harnessUsername: flags.string({ description: 'The Harness username. This is currently required if you inherit from delegate (See https://github.com/ldhertert/harness-cli/issues/6).  Can also be set via HARNESS_USERNAME environment variable.', env: 'HARNESS_USERNAME' }),
        harnessPassword: flags.string({ description: 'The Harness password. This is currently required if you inherit from delegate (See https://github.com/ldhertert/harness-cli/issues/6).  Can also be set via HARNESS_PASSWORD environment variable.', env: 'HARNESS_PASSWORD' }),
    }

    async run() {
        const { flags } = this.parse(CloudProviderCreateK8s)

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

        const result = await harness.cloudProviders.create(flags.name, options, flags.skipExisting)

        if (flags.inheritFromDelegate) {
            // Use a hack to set initial scope for cloud provider
            try {
                await this.usePrivateApiToUpdateScope(result.id, flags.harnessUsername, flags.harnessPassword)
            } catch (err) {
                this.error('Error setting scopes on cloud provider.', err)
            }
        }
    }

    // This is a hack until we add scoping support for kubernetes cloud providers to AWS, or I can get it to work with
    // Config as code
    async usePrivateApiToUpdateScope(cloudProviderId: string, username?: string, password?: string) {
        if (!username || !password) {
            this.warn('Cannot set scopes on cloud provider as Harness username or password is not set.  Please see https://github.com/ldhertert/harness-cli/issues/6 for more details.')
            return
        }

        const harness = new Harness({ accountId: this.context.config.harness.accountId || '', username: username, password: password })
        await harness.init()

        const existing = await harness.privateApiGet(`gateway/api/settings/${cloudProviderId}`)
        const updateBody = {
            name: existing.resource.name,
            value: existing.resource.value,
            category: existing.resource.category,
            accountId: existing.resource.accountId,
            usageRestrictions: {
                appEnvRestrictions: [
                    {
                        appFilter: {
                            type: 'GenericEntityFilter',
                            ids: undefined,
                            filterType: 'ALL',
                        },
                        envFilter: {
                            type: 'EnvFilter',
                            ids: undefined,
                            filterTypes: [
                                'PROD',
                            ],
                        },
                    },
                    {
                        appFilter: {
                            type: 'GenericEntityFilter',
                            ids: undefined,
                            filterType: 'ALL',
                        },
                        envFilter: {
                            type: 'EnvFilter',
                            ids: undefined,
                            filterTypes: [
                                'NON_PROD',
                            ],
                        },
                    },
                ],
            },
            uuid: existing.resource.uuid,
        }

        const updateResponse = await harness.privateApiPut(`/gateway/api/settings/${cloudProviderId}`, updateBody, { 
            accept: 'application/json, text/plain, */*',
            contentType: 'application/json;charset=UTF-8',
        })

        return updateResponse
    }
}
