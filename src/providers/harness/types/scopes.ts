
export enum FilterType {
    All = 'ALL',
}

export enum EnvFilterType {
    NonProd = 'NON_PRODUCTION_ENVIRONMENTS',
    Prod = 'PRODUCTION_ENVIRONMENTS',
}

export interface AppScopeFilter {
    appId?: string,
    filterType?: FilterType
}

export interface EnvScopeFilter {
    envId?: string,
    filterType?: EnvFilterType
}

export interface AppEnvScope {
    application: AppScopeFilter
    environment: EnvScopeFilter
}

export interface UsageScope {
    appEnvScopes: AppEnvScope[]
}

const DefaultUsageScope: UsageScope = {
    appEnvScopes: [
        {
            application: {
                filterType: FilterType.All,
            },
            environment: {
                filterType: EnvFilterType.NonProd,
            },
        },
        {
            application: {
                filterType: FilterType.All,
            },
            environment: {
                filterType: EnvFilterType.Prod,
            },
        },
    ],
}

export { DefaultUsageScope }
