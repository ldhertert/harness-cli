import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'
import { UsageScope, AppEnvScope, FilterType, EnvFilterType } from '../../providers/harness/types/scopes'
import { Harness } from '../../providers/harness/harness-api-client'

export default class SecretsUpdate extends Command {
    static aliases = ['secret:update', 'secrets:update']
    static description = 'Update a text secret'

    static flags = {
        ...Command.flags,
        name: flags.string({
            description: 'The name of the secret (alternative to id)',
            char: 'n',
            exclusive: ['id'],
        }),
        id: flags.string({ 
            description: 'The id of the secret (alternative to name)' }),
        value: flags.string({
            description: 'The value of the secret',
            required: true,
            char: 'v',
        }),
        accountScope: flags.boolean({
            description:
                'Scope this secret to the account for use in delegate profiles',
            exclusive: ['scope'],
        }),
        scope: flags.string({
            description: `
Restrict the use of this resource to specific Harness components.  
The expected format is 'application::environment'.  
The supported values for applications are 'ALL_APPS', an application name, or an application id.  
The supported values for environments are 'PROD_ENVS', 'NON_PROD_ENVS', an environment name, or an environment id.

Examples:
All applications, production environments: 'ALL_APPS::PROD_ENVS'
All applications, non-production environments: 'ALL_APPS::NON_PROD_ENVS'
Specific application, specific environment: 'MyCoolApp::development'
Specific application, non-production environment: 'rPyC0kD_SbymffS26SC_GQ::nonprod'`,
            multiple: true,
            default: ['ALL_APPS::PROD_ENVS', 'ALL_APPS::NON_PROD_ENVS'],
            exclusive: ['accountScope'],
        }),
    }

    async run() {
        const { flags } = this.parse(SecretsUpdate)

        const harness = await this.getHarnessClient()

        const nameOrId = flags.name || flags.id
        if (!nameOrId) {
            this.error('Either name or id is required.')
        }

        const secret = await harness.secrets.update(nameOrId, {
            name: flags.name,
            value: flags.value,
            usageScope: await this.parseUsageScope(flags.scope, harness),
            scopedToAccount: flags.accountScope,
        })
        this.log(secret)
    }

    async parseUsageScope(scopes: string[], harness: Harness) {
        const usageScope: UsageScope = {
            appEnvScopes: [],
        }

        for (const scope of scopes) {
            const split = scope.split('::')
            if (split.length !== 2) {
                this.error(`Invalid format for scope '${scope}'`, { exit: 1 })
            }
            const app = split[0]
            const env = split[1]

            const appEnvScope: AppEnvScope = {
                application: {},
                environment: {},
            }

            if (app === 'ALL_APPS') {
                appEnvScope.application.filterType = FilterType.All
            } else {
                const application = await harness.applications.get(app)
                appEnvScope.application.appId = application.id
            }

            if (env === 'PROD_ENVS') {
                appEnvScope.environment.filterType = EnvFilterType.Prod
            } else if (env === 'NON_PROD_ENVS') {
                appEnvScope.environment.filterType = EnvFilterType.NonProd
            } else {
                const environment = await harness.environments.get(
                    env,
                    appEnvScope.application.appId,
                )
                appEnvScope.environment.envId = environment.id
            }

            usageScope.appEnvScopes.push(appEnvScope)
        }
        return usageScope
    }
}
