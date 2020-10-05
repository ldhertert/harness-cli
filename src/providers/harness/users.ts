import { GraphQLClient } from '../../util/graphql-client'

export class Users {
    protected client: GraphQLClient;
    private fields = `
    email
    id
    isEmailVerified
    isImportedFromIdentityProvider
    isPasswordExpired
    isTwoFactorAuthenticationEnabled
    isUserLocked
    name
    userGroups(limit: 10) {
      nodes {
        id
        name
      }
    }
    `

    constructor(client: GraphQLClient) {
        this.client = client
    }

    async list() {
        const query = `
        query ($limit: Int!, $offset: Int) {
            result: users(limit: $limit, offset: $offset) {
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

    async get(idNameOrEmail: string) {
        try {
            const byNameResult = await this.getByName(idNameOrEmail)
            return byNameResult
        } catch {
            try {
                const byIdResult = await this.getById(idNameOrEmail)
                return byIdResult
            } catch {
                try {
                    const byEmailResult = await this.getByEmail(idNameOrEmail)
                    return byEmailResult
                } catch {
                    throw new Error(`User not found with name, email, or ID '${idNameOrEmail}'`)
                }
            }
        }
    }

    private async getById(id: string) {
        const query = `
        query ($id: String!) {
            result: user(id: $id) {
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
            result: userByName(name: $name) {
                ${this.fields}
            }
        }`

        const vars = { name }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }

    private async getByEmail(email: string) {
        const query = `
        query ($email: String!) {
            result: userByEmail(email: $email) {
                ${this.fields}
            }
        }`

        const vars = { email }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }

    async create(email: string, name: string, groupIds?: string[]) {
        const query = `
        mutation ($input: CreateUserInput!) {
            result: createUser(input: $input) {
                resource: user {
                    ${this.fields}
                }
            }
        }`

        const vars: any = {
            input: {
                name: name,
                email,
                userGroupIds: groupIds,
            },
        }
        
        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    } 
}
