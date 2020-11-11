import { Connectors, ConnectorType } from './connectors'
import { GraphQLClient } from '../../../util/graphql-client'

export interface DockerConnectorOptions {
    name: string, 
    url: string, 
    username?: string, 
    passwordSecretId?: string, 
}

export class DockerConnector {
    connector: Connectors;
    client: GraphQLClient;

    constructor(client: GraphQLClient, connector: Connectors) {
        this.client = client
        this.connector = connector
    }

    async list() {
        return (await this.connector.list()).filter(connector => connector.type === ConnectorType.Docker)
    }

    async get(idOrName: string) {
        return this.connector.get(idOrName, ConnectorType.Docker)
    }

    async create(options: DockerConnectorOptions) {
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
                connectorType: 'DOCKER',
                dockerConnector: {
                    name: options.name,
                    URL: options.url,
                    userName: options.username,
                    passwordSecretId: options.passwordSecretId,
                },
            },
        }

        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    }

    async update(idOrName: string, options: DockerConnectorOptions) {
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
                connectorType: 'DOCKER',
                dockerConnector: {
                    name: options.name,
                    URL: options.url,
                    userName: options.username,
                    passwordSecretId: options.passwordSecretId,
                },
            },
        }

        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    }

    async delete(idOrName: string) {
        return this.connector.delete(idOrName, ConnectorType.Docker)
    }
}
