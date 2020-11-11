import { GraphQLClient } from '../../../util/graphql-client'
import _ = require('lodash');
import { GitConnector } from './git'
import { DockerConnector } from './docker'

export enum ConnectorType {
    Docker = 'DockerConnector',
    Git = 'GitConnector'
}

export class Connectors {
    protected client: GraphQLClient;

    public fields = `
    id
    name
    createdAt
    createdBy {
        email
    }
    type: __typename
    
    ... on GitConnector {
        URL
        branch
        urlType
        userName
        passwordSecretId
        generateWebhookUrl
        webhookUrl

        customCommitDetails {
            authorEmailId
            authorName
            commitMessage
        }
    }
    `

    docker: DockerConnector;
    git: GitConnector;

    constructor(client: GraphQLClient) {
        this.client = client
        this.docker = new DockerConnector(client, this)
        this.git = new GitConnector(client, this)
    }

    async list() {
        const query = `
        query ($limit: Int!, $offset: Int) {
            result: connectors(limit: $limit, offset: $offset) {
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

    async get(idOrName: string, type?: ConnectorType) {
        if (!type) {
            return this.getById
        }
        
        try {
            const byNameResult = await this.getByName(idOrName, type)
            if (!byNameResult) {
                throw new Error('Not found by name')
            }
            return byNameResult
        } catch {
            try {
                const byIdResult = await this.getById(idOrName)
                return byIdResult
            } catch {
                throw new Error(`Connector not found with name or ID '${idOrName}'`)
            }
        }
    }

    async getById(id: string) {
        const query = `
        query ($id: String!) {
            result: connector(connectorId: $id) {
                ${this.fields}
            }
        }`

        const vars = { id }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }

    async getByName(name: string, type: ConnectorType) {
        const all = await this.list()
        return _.find(all, { name: name, type: type })
    } 

    async delete(idOrName: string, type: ConnectorType) {
        const connector = await this.get(idOrName, type)
        const query = `
        mutation ($input: DeleteConnectorInput!) {
            result: deleteConnector(input: $input) {     
                clientMutationId           
            }
        }`

        const vars = { 
            input: {
                connectorId: connector.id,
            },
        }

        await this.client.execute(query, vars)
    }
}
