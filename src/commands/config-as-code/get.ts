import { BaseCommand as Command } from '../../base-command'
import { HarnessStorageProvider } from '../../providers/storage/harness-api-storage'
import { flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class ConfigAsCodeGet extends Command {
    static aliases = ['config:get', 'config-as-code:get']

    static description = 'Fetch file contents based on path'

    static flags = {
        ...Command.flags,
        path: flags.string({ description: 'The file path(s) to fetch contents for. Glob patterns are supported.', required: true }),
        raw: flags.boolean({ description: 'Output raw YAML content instead of a JSON array.  This is only supported when there is a single file matching the provided path.' }),
        harnessUsername: flags.string({ description: 'The Harness username. This is required for now until the underlying APIs suport API key auth.  Can also be set via HARNESS_USERNAME environment variable.', env: 'HARNESS_USERNAME', required: true }),
        harnessPassword: flags.string({ description: 'The Harness password. This is required for now until the underlying APIs suport API key auth.  Can also be set via HARNESS_PASSWORD environment variable.', env: 'HARNESS_PASSWORD', required: true }),
    }

    async run() {
        const { flags } = this.parse(ConfigAsCodeGet)

        const harness = new Harness({ accountId: this.context.config.harness.accountId || '', username: flags.harnessUsername, password: flags.harnessPassword })
        try {
            await harness.init()
        } catch (error) {
            this.error('Error initializing Harness API Client', { exit: false })
            this.error(error, { exit: 1 })
        } 
        // const harness = await this.getHarnessClient()
        
        const storageProvider = new HarnessStorageProvider({ accountId: harness.accountId }, harness)
        await storageProvider.init()

        const result = await storageProvider.getFiles(flags.path)
        if (flags.raw) {
            if (result && result.length === 1) {
                this.log(result[0].content)
            } else {
                this.error(`There must be only one matching file for the provided path.  The following files were matched: \n\t${result.map(r => r.path).join('\n\t')}`)
            }
        } else {
            this.log(result)
        }
    }
}
