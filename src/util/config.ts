import { HarnessApiOptions } from '../providers/harness/harness-api-client'

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

export class Config {
    public static Git: GitCredentials = {
        username: process.env.GIT_USERNAME,
        password: process.env.GIT_PASSWORD,
        token: process.env.GIT_TOKEN,
        type: CredentialType.Git,
    }

    public static Harness: HarnessApiOptions = {
        url: process.env.HARNESS_MANAGER_URL || 'https://app.harness.io',
        accountId: process.env.HARNESS_ACCOUNT_ID || '', // Need to better handle this
        username: process.env.HARNESS_USERNAME,
        password: process.env.HARNESS_PASSWORD,
    }
}
