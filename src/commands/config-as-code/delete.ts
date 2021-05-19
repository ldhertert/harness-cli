import { BaseCommand as Command } from '../../base-command'
import { HarnessStorageProvider } from '../../providers/storage/harness-api-storage'
import { flags } from '@oclif/command'

export default class ConfigAsCodeDelete extends Command {
    static aliases = ['config:delete', 'config-as-code:delete']

    static description = 'Delete a config as code file at the given path'

    static flags = {
        ...Command.flags,
        path: flags.string({ description: 'The file path to delete.  Glob patterns are supported.', required: true }),
        harnessUsername: flags.string({ description: '[DEPRECATED] The Harness username. Can also be set via HARNESS_USERNAME environment variable.', env: 'HARNESS_USERNAME' }),
        harnessPassword: flags.string({ description: '[DEPRECATED] The Harness password. Can also be set via HARNESS_PASSWORD environment variable.', env: 'HARNESS_PASSWORD' }),
    }

    async run() {
        const { flags } = this.parse(ConfigAsCodeDelete)

        const harness = await this.getHarnessClientDeprecated(flags.harnessUsername, flags.harnessPassword)
        
        const storageProvider = new HarnessStorageProvider({ accountId: harness.accountId }, harness)
        await storageProvider.init()

        const result = await storageProvider.deleteFile(flags.path)
        this.log(result)
        this.log(`Successfully deleted ${flags.path}`)
    }
}
