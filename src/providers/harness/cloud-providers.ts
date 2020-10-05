import { GraphQLClient } from '../../util/graphql-client'

export enum K8sClusterDetailsType {
    Inherit = 'INHERIT_CLUSTER_DETAILS',
    Manual = 'MANUAL_CLUSTER_DETAILS',
    ServiceAccountToken = 'SERVICE_ACCOUNT_TOKEN'
}

export interface K8sCloudProviderOptions {
    clusterDetailsType: K8sClusterDetailsType,
    skipValidation: boolean,

    // Inherited delegate
    delegateName?: string,
    // UsageScope

    // Manual
    masterUrl?: string
    serviceAccountToken?: string
}

export class CloudProviders {
    protected client: GraphQLClient;
    private fields = `
    id
    name

    createdAt
    createdBy {
        email
    }
    `

    constructor(client: GraphQLClient) {
        this.client = client
    }

    async create(name: string, options: K8sCloudProviderOptions) {
        const query = `
        mutation ($input: CreateCloudProviderInput!) {
            result: createCloudProvider(input: $input) {
                resource: cloudProvider {
                    ${this.fields}
                }
            }
        }`

        const vars: any = {
            input: {
                cloudProviderType: 'KUBERNETES_CLUSTER',
                k8sCloudProvider: {
                    name: name,
                    skipValidation: options.skipValidation,
                    clusterDetailsType: options.clusterDetailsType,                    
                },
            },
        }

        if (options.clusterDetailsType === K8sClusterDetailsType.Inherit) {
            vars.input.k8sCloudProvider.clusterDetailsType = K8sClusterDetailsType.Inherit
            vars.input.k8sCloudProvider.inheritClusterDetails = {
                delegateName: options.delegateName,
            }
        } else if (options.clusterDetailsType === K8sClusterDetailsType.ServiceAccountToken) {
            vars.input.k8sCloudProvider.clusterDetailsType = K8sClusterDetailsType.Manual
            vars.input.k8sCloudProvider.manualClusterDetails = {
                type: options.clusterDetailsType,
                masterUrl: options.masterUrl,
                serviceAccountToken: {
                    serviceAccountTokenSecretId: options.serviceAccountToken,
                },
            }
        }
        const result = await this.client.execute(query, vars)
        return result
    }
}
