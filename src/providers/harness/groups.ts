import { GraphQLClient } from '../../util/graphql-client'

export interface GroupOptions {
    permissions?: any
}

export class Groups {
    protected client: GraphQLClient;
    private fields = `
        id
        name
        description
        isSSOLinked
        importedByScim
        users(limit: 190, offset: 0) {
            pageInfo {
                total
            }
            nodes {
                name
                email
            }
        }
        permissions {
            accountPermissions {
                accountPermissionTypes
            }
            appPermissions {
                permissionType
                applications {
                    filterType
                    appIds
                }
                services {
                    filterType
                    serviceIds
                }
                environments {
                    filterTypes
                    envIds
                }
                workflows {
                    filterTypes
                    envIds
                }
                deployments {
                    filterTypes
                    envIds
                }
                pipelines {
                    filterTypes
                    envIds
                }
                provisioners {
                    filterType
                    provisionerIds
                }
                actions
            }
        }

        notificationSettings {
            sendNotificationToMembers
            sendMailToNewMembers
            slackNotificationSetting {
                slackChannelName
                slackWebhookURL
            }
            groupEmailAddresses
        }
    `

    constructor(client: GraphQLClient) {
        this.client = client
    }

    async list() {
        const query = `
        query ($limit: Int!, $offset: Int) {
            result: userGroups(limit: $limit, offset: $offset) {
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
            } catch (err) {
                let message = 'Unknown error'
                if (err.errors) {
                    message = err.errors.map((e: { message: string; }) => '\t' + e.message).join('\n')
                }
                throw new Error(`Error fetching group '${idOrName}':\n ${message}`)
            }
        }
    }

    private async getById(id: string) {
        const query = `
        query ($id: String!) {
            result: userGroup(userGroupId: $id) {
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
            result: userGroupByName(name: $name) {
                ${this.fields}
            }
        }`

        const vars = { name }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }

    async create(name: string, opts: GroupOptions) {
        const query = `
        mutation ($input: CreateUserGroupInput!) {
            result: createUserGroup(input: $input) {
                resource: userGroup {
                    ${this.fields}
                }
            }
        }`

        const vars: any = {
            input: {
                name: name,
                permissions: opts.permissions,
            },
        }
        
        const result = await this.client.execute(query, vars)
        return result
    }

    async delete(idOrName: string) {
        const old = await this.get(idOrName)
        const query = `
        mutation ($input: DeleteUserGroupInput!) {
            result: deleteUserGroup(input: $input) {     
                clientMutationId           
            }
        }`

        const vars = { 
            input: {
                userGroupId: old.id,
            },
        }

        await this.client.execute(query, vars)
    }
}
