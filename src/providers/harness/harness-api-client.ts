import { URL } from 'url'
import { GraphQLClient } from '../../util/graphql-client'
import { Applications } from './applications'
import { GitConnectors } from './git-connectors'
import { Secrets } from './secrets'
import { Environments } from './environments'
import { CloudProviders } from './cloud-providers'
import { Groups } from './groups'
import { Users } from './users'
import axios from 'axios'

export interface HarnessApiOptions {
    accountId: string,
    apiKey?: string,
    username?: string,
    password?: string,
    managerUrl?: string,
}

const defaultManagerUrl = 'https://app.harness.io'

export class Harness {
    managerUrl: string;
    accountId: string;
    protected apiKey?: string;
    protected bearerToken?: string;
    client: GraphQLClient;

    applications: Applications;
    connectors: { git: GitConnectors; };
    secrets: Secrets;
    environments: Environments
    cloudProviders: CloudProviders
    groups: Groups
    users: Users

    constructor(options: HarnessApiOptions) {
        this.managerUrl = new URL(options.managerUrl || defaultManagerUrl).origin

        this.apiKey = options.apiKey
        this.accountId = options.accountId

        const headers: any = { }

        if (this.apiKey) {
            headers['x-api-key'] = this.apiKey
        } else if (this.bearerToken) {
            headers.authorization = `Bearer ${this.bearerToken}`
        }
        
        this.client = new GraphQLClient(`${this.managerUrl}/gateway/api/graphql?accountId=${this.accountId}`, headers)

        this.secrets = new Secrets(this.client)
        this.applications = new Applications(this.client)
        this.connectors = {
            git: new GitConnectors(this.client),
        }
        this.environments = new Environments(this.client, this)
        this.cloudProviders = new CloudProviders(this.client)
        this.groups = new Groups(this.client)
        this.users = new Users(this.client)
    }

    static async login(username: string, password: string, managerUrl?: string) {
        const data = {
            authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
        }
        
        const response = await axios.post(`${new URL(managerUrl || defaultManagerUrl).origin}/gateway/api/users/login`, data)

        return {
            token: response.data.resource.token,
            defaultAccountId: response.data.resource.defaultAccountId,
            accounts: response.data.resource.accounts
                .concat(response.data.resource.supportAccounts)
                .map((a: { accountName: string; companyName: string; uuid: string }) => {
                    return { name: a.accountName, company: a.companyName, id: a.uuid }
                }),
        }
    }
}
