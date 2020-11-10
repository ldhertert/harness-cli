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

    async create(name: string, options: K8sCloudProviderOptions, skipExisting?: boolean) {
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
        let result: any
        try {
            result = await this.client.execute(query, vars)
            return result
        } catch (err) {
            if (err.errors?.filter((e: { message: string | string[]; }) => e.message.includes('already exists')).length > 0) {
                if (skipExisting) {
                    return result
                }
            }
            throw err
        }
    }

    async get(idOrName: string) {
        try {
            const byNameResult = await this.getByName(idOrName)
            return byNameResult
        } catch {
            try {
                const byIdResult = await this.getById(idOrName)
                return byIdResult
            } catch {
                throw new Error(`Cloud provider not found with name or ID '${idOrName}'`)
            }
        }
    }

    private async getById(id: string) {
        const query = `
        query ($id: String!) {
            result: cloudProvider(cloudProviderId: $id) {
                ${this.fields}
            }
        }`

        const vars = { id }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }

    private async getByName(name: string) {
        const query = `
        query ($name: String!) {
            result: cloudProviderByName(name: $name) {
                ${this.fields}
            }
        }`

        const vars = { name }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }

    async delete(idOrName: string) {
        const resource = await this.get(idOrName)
        const query = `
        mutation ($input: DeleteCloudProviderInput!) {
            result: deleteCloudProvider(input: $input) {     
                clientMutationId           
            }
        }`

        const vars = {
            input: {
                cloudProviderId: resource.id,
            },
        }

        await this.client.execute(query, vars)
    }
}
