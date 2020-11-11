import { GraphQLClient, GraphQLError } from '../../util/graphql-client'

export interface GitSyncOptions {
    gitConnectorId?: string,
    syncEnabled: boolean,
    branch?: string
}

export class Applications {
    protected client: GraphQLClient;
    // private fields = `
    // id
    // name
    // description

    // gitSyncConfig {
    //     branch
    //     syncEnabled
    //     gitConnector {
    //         id
    //         name
    //         URL
    //     }
    // }

    // createdAt
    // createdBy {
    //     email
    // }
    // `

    // removing git sync info for now due to problem with graphql api
    private fields = `
    id
    name
    description

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

        const limit = 100
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

    async create(name: string, description?: string, gitSyncOptions?: GitSyncOptions, skipExisting?: boolean) {
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
        let application: any

        try {
            const result = await this.client.execute(query, vars)
            application = result.data.result.resource
        } catch (exception) {
            if (exception.errors?.filter((e: { message: string | string[]; }) => e.message.includes('Duplicate name')).length > 0) {
                if (skipExisting) {
                    return
                } 
                throw new Error('Application already exists')                
            }
            // Seeing weird behavior with this API
            // Initial create returns both a result and an error saying that user is not authorized
            if (exception instanceof GraphQLError && exception.data?.result?.resource) {
                application = exception.data.result.resource
            } else {
                throw exception
            }
        }

        if (gitSyncOptions) {
            await this.updateGitConfig(application.id, gitSyncOptions)
            application = await this.getById(application.id)
        }

        return application
    }

    async update(idOrName: string, newName?: string, description?: string, gitSyncOptions?: GitSyncOptions) {
        let application = await this.get(idOrName)
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

        application = result.data.result.resource

        if (gitSyncOptions) {
            await this.updateGitConfig(application.id, gitSyncOptions)
            application = await this.getById(application.id)
        }

        return application
    }

    async updateGitConfig(applicationId: string, options: GitSyncOptions) {
        let query: string
        let vars: any

        options = options || { syncEnabled: false }

        if (options.syncEnabled) {
            query = `
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
            vars = {
                input: {
                    applicationId,
                    gitConnectorId: options.gitConnectorId,
                    branch: options.branch || 'master',
                    syncEnabled: options.syncEnabled,
                },
            }
        } else {
            query = `
            mutation ($input:  RemoveApplicationGitSyncConfigInput!) {
                removeApplicationGitSyncConfig(input: $input){
                    clientMutationId
                }
            }            
            `
            vars = {
                input: {
                    applicationId,
                },
            }
        }

        await this.client.execute(query, vars)
        return this.getById(applicationId)
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
