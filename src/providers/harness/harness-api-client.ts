import { URL } from 'url'
import { GraphQLClient } from '../../util/graphql-client'
import { Applications } from './applications'
import { GitConnectors } from './git-connectors'

export interface HarnessApiOptions {
    accountId: string,
    apiKey: string,
    managerUrl?: string,
}

export class Harness {
    protected managerUrl: string;
    protected apiKey: string;
    protected accountId: string;
    protected gql: GraphQLClient;

    applications: Applications;
    connectors: { git: GitConnectors; };

    constructor(options: HarnessApiOptions) {
        this.managerUrl = new URL(options.managerUrl || 'https://app.harness.io').origin
        this.accountId = options.accountId
        this.apiKey = options.apiKey
        this.gql = new GraphQLClient(`${this.managerUrl}/gateway/api/graphql?accountId=${this.accountId}`, {
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json',
        })

        this.applications = new Applications(this.gql)
        this.connectors = {
            git: new GitConnectors(this.gql),
        }
    }
}
