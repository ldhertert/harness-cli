
export enum CredentialType {
    Git = 'Git',
    Harness = 'Harness',
}

export interface Credentials {
    url?: string
    type: CredentialType    
}

export interface GitCredentials extends Credentials {
    username?: string
    password?: string
    token?: string
}

export interface HarnessCredentials extends Credentials {
    accountId: string
    username?: string
    password?: string
    apiKey?: string
}
