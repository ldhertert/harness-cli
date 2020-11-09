import { GraphQLClient } from '../../util/graphql-client'

export class SecretManagers {
    protected client: GraphQLClient;

    private fields = `
    id
    name
    `

    constructor(client: GraphQLClient) {
        this.client = client
    }

    async list() {
        const query = `
        query ($limit: Int!, $offset: Int) {
            result: secretManagers(limit: $limit, offset: $offset) {
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
                throw new Error(`Secret Manager not found with name or ID '${idOrName}'`)
            }
        }
    }

    private async getById(id: string) {
        const query = `
        query ($id: String!) {
            result: secretManager(secretId: $id) {
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
            result: secretManagerByName(name: $name) {
                ${this.fields}
            }
        }`

        const vars = { name }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }
}
