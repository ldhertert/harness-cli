import { GraphQLClient } from '../../util/graphql-client'
import { UsageScope, DefaultUsageScope } from './types/scopes'

export enum SecretType {
    Text = 'ENCRYPTED_TEXT',
    File = 'ENCRYPTED_FILE',
    SSH = 'SSH_CREDENTIAL',
    WinRM = 'WINRM_CREDENTIAL',
}

export interface CreateSecretOptions {
    secretManager: string,
    value: string,
    name: string,
    type?: SecretType,
    usageScope?: UsageScope,
    scopedToAccount?: boolean,
}

export interface UpdateSecretOptions {
    secretManager?: string,
    value?: string,
    name?: string,
    type?: SecretType,
    usageScope?: UsageScope,
    scopedToAccount?: boolean
}

export class Secrets {
    protected client: GraphQLClient;
    private fields = `
    id
    name
    secretType
    usageScope{
        appEnvScopes{
            application{
                filterType
                appId
            }
            environment{
                filterType
                envId
            }
        }
    }
    
    ... on EncryptedText{
        secretManagerId
        scopedToAccount
    }`

    constructor(client: GraphQLClient) {
        this.client = client
    }

    /* async list() {
        throw new Error('No API available for listing secrets')
    } */

    async get(idOrName: string, secretType?: SecretType) {
        try {
            const byNameResult = await this.getByName(idOrName, secretType)
            return byNameResult
        } catch {
            try {
                const byIdResult = await this.getById(idOrName, secretType)
                return byIdResult
            } catch {
                throw new Error(`Secret not found with name or ID '${idOrName}'`)
            }
        }
    }

    private async getById(id: string, secretType?: SecretType) {
        const query = `
        query ($id: String!, $secretType: SecretType!) {
            result: secret(secretId: $id, secretType: $secretType) {
                ${this.fields}
            }
        }`

        const vars = { id, secretType: secretType || SecretType.Text }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }

    private async getByName(name: string, secretType?: SecretType) {
        const query = `
        query ($name: String!, $secretType: SecretType!) {
            result: secretByName(name: $name, secretType: $secretType) {
                ${this.fields}
            }
        }`

        const vars = { name, secretType: secretType || SecretType.Text }

        const result = await this.client.execute(query, vars)
        return result.data.result
    }

    async create(options: CreateSecretOptions) {
        const query = `
        mutation ($input: CreateSecretInput!) {
            result: createSecret(input: $input) {
                resource: secret {
                    ${this.fields}
                }
            }
        }`

        const scope = options.scopedToAccount ? undefined : options.usageScope || DefaultUsageScope

        const vars = {
            input: {
                secretType: options.type || SecretType.Text,
                encryptedText: {
                    name: options.name,
                    value: options.value,
                    secretManagerId: options.secretManager,
                    usageScope: scope,
                    scopedToAccount: options.scopedToAccount || false,
                },                
            },
        }

        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    }

    async update(idOrName: string, options: UpdateSecretOptions) {
        const old = await this.get(idOrName, options.type)
        const query = `
        mutation ($input: UpdateSecretInput!) {
            result: updateSecret(input: $input) {
                resource: secret {
                    ${this.fields}
                }
            }
        }`

        let scope = options.usageScope
        if (options.scopedToAccount) {
            scope = undefined
        }

        const vars = {
            input: {
                secretId: old.id,
                secretType: old.secretType,
                encryptedText: {
                    name: options.name,
                    value: options.value,
                    usageScope: scope,
                    scopedToAccount: options.scopedToAccount,
                },                
            },
        }

        const result = await this.client.execute(query, vars)
        return result.data.result.resource
    }

    async delete(idOrName: string, type?: SecretType) {
        const old = await this.get(idOrName, type)
        const query = `
        mutation ($input: DeleteSecretInput!) {
            result: deleteSecret(input: $input) {     
                clientMutationId           
            }
        }`

        const vars = { 
            input: {
                secretId: old.id,
                secretType: old.secretType,
            },
        }

        await this.client.execute(query, vars)
    }
}
