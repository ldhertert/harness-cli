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
import { ConfigAsCode } from './config-as-code'

export interface HarnessApiOptions {
    accountId: string,
    apiKey?: string,
    username?: string,
    password?: string,
    bearerToken?: string,
    managerUrl?: string,
}

const defaultManagerUrl = 'https://app.harness.io'

export class Harness {
    managerUrl: string;
    accountId: string;
    apiKey?: string;
    username?: string;
    password?: string;
    bearerToken?: string;
    client: GraphQLClient;

    applications: Applications;
    connectors: { git: GitConnectors; };
    secrets: Secrets;
    environments: Environments
    cloudProviders: CloudProviders
    groups: Groups
    users: Users
    configAsCode: ConfigAsCode

    constructor(options: HarnessApiOptions) {
        this.managerUrl = new URL(options.managerUrl || defaultManagerUrl).origin

        this.apiKey = options.apiKey
        this.username = options.username
        this.password = options.password
        this.bearerToken = options.bearerToken
        this.accountId = options.accountId

        const headers: any = { 'Content-Type': 'application/json' }

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
        this.configAsCode = new ConfigAsCode(this)
    }

    static async login(username: string, password: string, managerUrl?: string) {
        const data = {
            authorization: 'Basic ' + Buffer.from(username + ':' + password).toString('base64'),
        }
        
        const response = await axios.post(`${new URL(managerUrl || defaultManagerUrl).origin}/gateway/api/users/login`, data)

        return {
            token: response.data.resource.token,
            defaultAccountId: response.data.resource.defaultAccountId as string,
            accounts: response.data.resource.accounts
                .concat(response.data.resource.supportAccounts)
                .map((a: { accountName: string; companyName: string; uuid: string }) => {
                    return { name: a.accountName, company: a.companyName, id: a.uuid }
                }),
        }
    }

    static async fromUrl(url: string) {
        const parsed = new URL(url)

        const options: HarnessApiOptions = {
            managerUrl: parsed.origin,
            accountId: '',
        }

        const accountId = parsed.searchParams.get('accountId') 

        if (parsed.username && !parsed.password) {
            options.apiKey = decodeURIComponent(parsed.username)
            if (!accountId) {
                throw new Error('Account id is required when authenticating via API key')
            }
            options.accountId = accountId
        } else if (parsed.username) {
            options.username = decodeURIComponent(parsed.username)
            options.password = decodeURIComponent(parsed.password)
            const account = await Harness.login(options.username, options.password, options.managerUrl)
            options.bearerToken = account.token
            options.accountId = accountId || account.defaultAccountId
        } else {
            throw new Error('Either API key or username/password are required')
        }

        return new Harness(options)
    }

    async privateApiGet(path: string) {
        const url = new URL(path, this.managerUrl)
        url.searchParams.append('accountId', this.accountId)

        const response = await axios.get(url.href, {
            headers: {
                Authorization: `Bearer ${this.bearerToken}`,
            },
        })
        
        return response.data
    }

    async privateApiPost(path: string, data: any, headers?: any) {
        const url = new URL(path, this.managerUrl)
        url.searchParams.append('accountId', this.accountId)

        headers = headers || {}
        headers.Authorization = `Bearer ${this.bearerToken}`
        const response = await axios.post(url.href, data, {
            headers: headers,
        })
        
        return response.data
    }
}
