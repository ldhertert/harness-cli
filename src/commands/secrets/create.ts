import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'
import { UsageScope, AppEnvScope, FilterType, EnvFilterType } from '../../providers/harness/types/scopes'
import { SecretType } from '../../providers/harness/secrets'
import { Harness } from '../../providers/harness/harness-api-client'

export default class SecretsCreate extends Command {
    static aliases = ['secret:create', 'secrets:create']
    static description = 'Create a new secret'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the secret', required: true, char: 'n' }),
        value: flags.string({ description: 'The value of the secret', required: true, char: 'v' }),
        accountScope: flags.boolean({ description: 'Scope this secret to the account for use in delegate profiles', exclusive: ['scope'] }),
        scope: flags.string({
            description: `
Restrict the use of this resource to specific Harness components.  
The expected format is "application::environment".  
The supported values for applications are "ALL_APPS", an application name, or an application id.  
The supported values for environments are "PROD_ENVS", "NON_PROD_ENVS", an environment name, or an environment id.

Examples:
All applications, production environments: "ALL_APPS::PROD_ENVS"
All applications, non-production environments: "ALL_APPS::NON_PROD_ENVS"
Specific application, specific environment: "MyCoolApp::development"
Specific application, non-production environment: "rPyC0kD_SbymffS26SC_GQ::nonprod"`,
            multiple: true,
            default: ['ALL_APPS::PROD_ENVS', 'ALL_APPS::NON_PROD_ENVS'],
            exclusive: ['accountScope'],
        }),
        secretManager: flags.string({ description: 'The id of the secret manager to leverage', required: true }),
        type: flags.enum({ options: [SecretType.Text], required: true, default: SecretType.Text }),
        skipExisting: flags.boolean({ description: 'If true, this command will not fail if an resource with the same name already exists.', default: false}),
    }

    async run() {
        const { flags } = this.parse(SecretsCreate)

        const harness = await this.getHarnessClient()

        try {
            const secret = await harness.secrets.create({
                name: flags.name,
                value: flags.value,
                type: flags.type,
                usageScope: await this.parseUsageScope(flags.scope, harness),
                scopedToAccount: flags.accountScope,
                secretManager: flags.secretManager,
            })
            this.log(secret)
        } catch (err) {
            const existsError = err.errors?.filter((e: { message: string | string[]; }) => e.message.includes('Duplicate name') || e.message.includes('secret exists')).length > 0
            if (existsError && flags.skipExisting) {
                this.debug('Resource already exists, but skipExisting is true.')
            } else {
                throw err
            }
        }
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
                const environment = await harness.environments.get(env, appEnvScope.application.appId)
                appEnvScope.environment.envId = environment.id
            }

            usageScope.appEnvScopes.push(appEnvScope)
        }

        return usageScope
    }
}
