import { BaseCommand as Command } from '../../base-command'
import { HarnessStorageProvider } from '../../providers/storage/harness-api-storage'
import { flags } from '@oclif/command'

export default class ConfigAsCodeListFiles extends Command {
    static aliases = ['config:list', 'config-as-code:list-files']

    static description = 'List file tree for config-as-code'

    static flags = {
        ...Command.flags,
        harnessUsername: flags.string({ description: '[DEPRECATED] The Harness username. Can also be set via HARNESS_USERNAME environment variable.', env: 'HARNESS_USERNAME' }),
        harnessPassword: flags.string({ description: '[DEPRECATED] The Harness password. Can also be set via HARNESS_PASSWORD environment variable.', env: 'HARNESS_PASSWORD' }),
    }

    async run() {
        const {flags} = this.parse(ConfigAsCodeListFiles)

        const harness = await this.getHarnessClientDeprecated(flags.harnessUsername, flags.harnessPassword)
        
        const storageProvider = new HarnessStorageProvider({ accountId: harness.accountId }, harness)
        await storageProvider.init()

        const result = storageProvider.files
        this.log(result.map(file => file.path))
    }
}
