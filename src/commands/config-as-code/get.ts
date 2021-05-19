import { BaseCommand as Command } from '../../base-command'
import { HarnessStorageProvider } from '../../providers/storage/harness-api-storage'
import { flags } from '@oclif/command'
import { LocalStorageProvider } from '../../providers/storage/local-storage'

export default class ConfigAsCodeGet extends Command {
    static aliases = ['config:get', 'config-as-code:get']

    static description = 'Fetch file contents based on path'

    static flags = {
        ...Command.flags,
        path: flags.string({ description: 'The file path(s) to fetch contents for. Glob patterns are supported.', required: true }),
        out: flags.string({ description: 'A directory path on the local filesystem that will be used to write file contents to disk. '}),
        raw: flags.boolean({ description: 'Output raw YAML content instead of a JSON array.  This is only supported when there is a single file matching the provided path.' }),
        harnessUsername: flags.string({ description: '[DEPRECATED] The Harness username. Can also be set via HARNESS_USERNAME environment variable.', env: 'HARNESS_USERNAME' }),
        harnessPassword: flags.string({ description: '[DEPRECATED] The Harness password. Can also be set via HARNESS_PASSWORD environment variable.', env: 'HARNESS_PASSWORD' }),
    }

    async run() {
        const { flags } = this.parse(ConfigAsCodeGet)

        const harness = await this.getHarnessClientDeprecated(flags.harnessUsername, flags.harnessPassword)
        
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

        if (flags.out) {
            const localfs = new LocalStorageProvider({ directory: flags.out })
            await localfs.storeFiles(result)
        }
    }
}
