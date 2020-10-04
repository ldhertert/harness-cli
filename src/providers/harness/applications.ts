import { GraphQLClient } from '../../util/graphql-client'

export class Applications {
    protected client: GraphQLClient;
    private fields = `
    id
    name
    description

    gitSyncConfig {
        branch
        syncEnabled
        gitConnector {
            id
            name
            URL
        }
    }

    createdAt
    createdBy {
        email
    }
    `

    constructor(client: GraphQLClient) {
        this.client = client
    }

    async list() {
        const query = `
        query ($limit: Int!, $offset: Int) {
            result: applications(limit: $limit, offset: $offset) {
                pageInfo {
                    hasMore
                }
                nodes {
                    ${this.fields}
                }
            }
        }`

        const vars: any = {}

        const limit = 1
        let offset = 0
        let results: any[] = []
        let hasMore = true
        while (hasMore) {
            vars.limit = limit
            vars.offset = offset
            const result = await this.client.execute(query, vars)
            results = results.concat(result.data.result.nodes)
            hasMore = result.data.result.pageInfo.hasMore
            offset += limit
        }

        return results
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
                throw new Error(`Application not found with name or ID '${idOrName}'`)
            }
        }
    }

    private async getById(id: string) {
        const query = `
        query ($id: String!) {
            result: application(applicationId: $id) {
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
            result: applicationByName(name: $name) {
                ${this.fields}
            }
        }`

        const vars = { name }

        const result = await this.client.execute(query, vars)
        return result.data.result
    } 

    async create(name: string, description?: string) {
        const query = `
        mutation ($input: CreateApplicationInput!) {
            result: createApplication(input: $input) {
                resource: application {
                    ${this.fields}
                }
            }
        }`

        const vars = { 
            input: {
                name, 
                description,
            },
        }

        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    }

    async update(idOrName: string, newName: string, description?: string) {
        const application = await this.get(idOrName)
        const query = `
        mutation ($input: UpdateApplicationInput!) {
            result: updateApplication(input: $input) {
                resource: application {
                    ${this.fields}
                }
            }
        }`

        const vars = { 
            input: {
                applicationId: application.id,
                name: newName, 
                description,
            },
        }

        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    }

    async updateGitConfig(applicationId: string, gitConnectorId: string, syncEnabled: boolean, branch?: string) {
        const query = `
        mutation ($input: UpdateApplicationGitSyncConfigInput!) {
            result: updateApplicationGitSyncConfig(input: $input) {
                resource: gitSyncConfig {
                    branch
                    syncEnabled
                    gitConnector {
                        id
                        name
                    }
                }
            }
        }`

        const vars = { 
            input: {
                applicationId,
                gitConnectorId, 
                branch: branch || 'master',
                syncEnabled,
            },
        }

        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    }

    async delete(idOrName: string) {
        const application = await this.get(idOrName)
        const query = `
        mutation ($input: DeleteApplicationInput!) {
            result: deleteApplication(input: $input) {     
                clientMutationId           
            }
        }`

        const vars = { 
            input: {
                applicationId: application.id,
            },
        }

        await this.client.execute(query, vars)
    }
}
