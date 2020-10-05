import { GraphQLClient } from '../../util/graphql-client'
import { Harness } from './harness-api-client'

export enum EnvironmentType {
    Prod = 'PROD',
    NonProd = 'NON_PROD',
}

export interface ListOptions {
    applicationId?: string,
    environmentType?: EnvironmentType,
    tag?: { name: string, value?: string },
}

export class Environments {
    protected client: GraphQLClient;
    private fields = `
    id
    name
    description
    type
    
    application {
        id
        name
    }

    createdAt
    createdBy {
        email
    }
    `
    harness: Harness;

    constructor(client: GraphQLClient, harness: Harness) {
        this.client = client
        this.harness = harness
    }

    async list(options?: ListOptions) {
        const query = `
        query ($limit: Int!, $offset: Int, $filters:[EnvironmentFilter]) {
            result: environments(limit: $limit, offset: $offset, filters: $filters) {
                pageInfo {
                    hasMore
                }
                nodes {
                    ${this.fields}
                }
            }
        }`

        const vars: any = {
            filters: [],
        }

        if (options?.applicationId !== undefined) {
            vars.filters.push({
                application: { operator: 'EQUALS', values: [options.applicationId] },
            })
        }

        if (options?.environmentType !== undefined) {
            vars.filters.push({
                environmentType: { operator: 'EQUALS', values: [options.environmentType] },
            })
        }

        if (options?.tag !== undefined) {
            vars.filters.push({
                tag: {  entityType: 'APPLICATION', tags: [{ name: options.tag.name, value: options.tag.value }] },
            })
        }

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

    async get(idOrName: string, application?: string) {
        try {
            const byIdResult = await this.getById(idOrName)
            return byIdResult
        } catch {
            const byNameResult = await this.getByName(idOrName, application)
            if (byNameResult) {
                return byNameResult
            }
            throw new Error('Environment not found')
        }
    }

    private async getById(id: string) {
        const query = `
        query ($id: String!) {
            result: environment(environmentId: $id) {
                ${this.fields}
            }
        }`

        const vars = { id }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }

    private async getByName(name: string, application?: string) {
        const opts: ListOptions = {}
        if (application) {
            const app = await this.harness.applications.get(application)
            opts.applicationId = app.id
        }
        const envs = await this.list(opts)
        const filtered = envs.filter(env => env.name === name)
        if (filtered.length === 1) {
            return filtered[0]
        } 
        
        if (filtered.length > 1) {
            throw new Error(`Multiple environments with the name ${name} exist.  Please provide an application filter or reference environment by id`)
        }
    } 
}
