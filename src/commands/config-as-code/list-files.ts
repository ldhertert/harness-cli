import { BaseCommand as Command } from '../../base-command'
import { HarnessStorageProvider } from '../../providers/storage/harness-api-storage'
import { flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class ConfigAsCodeListFiles extends Command {
    static aliases = ['config:list', 'config-as-code:list-files']

    static description = 'List file tree for config-as-code'

    static flags = {
        ...Command.flags,
        harnessUsername: flags.string({ description: 'The Harness username. This is required for now until the underlying APIs suport API key auth.  Can also be set via HARNESS_USERNAME environment variable.', env: 'HARNESS_USERNAME', required: true }),
        harnessPassword: flags.string({ description: 'The Harness password. This is required for now until the underlying APIs suport API key auth.  Can also be set via HARNESS_PASSWORD environment variable.', env: 'HARNESS_PASSWORD', required: true }),
    }

    async run() {
        const {flags} = this.parse(ConfigAsCodeListFiles)

        const harness = new Harness({ accountId: this.context.config.harness.accountId || '', username: flags.harnessUsername, password: flags.harnessPassword })
        try {
            await harness.init()
        } catch (error) {
            this.error('Error initializing Harness API Client', { exit: false })
            this.error(error, { exit: 1 })
        }
        
        const storageProvider = new HarnessStorageProvider({ accountId: harness.accountId }, harness)
        await storageProvider.init()

        const result = storageProvider.files
        this.log(result.map(file => file.path))
    }
}
