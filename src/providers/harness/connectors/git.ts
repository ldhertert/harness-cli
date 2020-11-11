import { Connectors, ConnectorType } from './connectors'
import { GraphQLClient } from '../../../util/graphql-client'

export interface GitConnectorOptions {
    name: string, 
    url: string, 
    username: string, 
    passwordSecretId: string, 
    branch?: string
}

export class GitConnector {
    connector: Connectors;
    client: GraphQLClient;

    constructor(client: GraphQLClient, connector: Connectors) {
        this.client = client
        this.connector = connector
    }

    async list() {
        return (await this.connector.list()).filter(connector => connector.type === ConnectorType.Git)
    }

    async get(idOrName: string) {
        return this.connector.get(idOrName, ConnectorType.Git)
    }

    async create(options: GitConnectorOptions) {
        const query = `
        mutation ($input: CreateConnectorInput!) {
            result: createConnector(input: $input) {
                resource: connector {
                    ${this.connector.fields}
                }
            }
        }`

        const vars = { 
            input: {
                connectorType: 'GIT',
                gitConnector: {
                    urlType: 'REPO',
                    name: options.name,
                    generateWebhookUrl: true,
                    URL: options.url,
                    userName: options.username,
                    passwordSecretId: options.passwordSecretId,
                    branch: options.branch,
                },
            },
        }

        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    }

    async update(idOrName: string, options: GitConnectorOptions) {
        const connector = await this.get(idOrName)
        const query = `
        mutation ($input: UpdateConnectorInput!) {
            result: updateConnector(input: $input) {
                resource: connector {
                    ${this.connector.fields}
                }
            }
        }`

        const vars = { 
            input: {
                connectorId: connector.id,
                connectorType: 'GIT',
                gitConnector: {
                    urlType: 'REPO',
                    name: options.name,
                    generateWebhookUrl: true,
                    URL: options.url,
                    userName: options.username,
                    passwordSecretId: options.passwordSecretId,
                    branch: options.branch,
                },
            },
        }

        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    }

    async delete(idOrName: string) {
        return this.connector.delete(idOrName, ConnectorType.Git)
    }
}
