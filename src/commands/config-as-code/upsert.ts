import { BaseCommand as Command } from '../../base-command'
import { HarnessStorageProvider } from '../../providers/storage/harness-api-storage'
import { flags } from '@oclif/command'
import { LocalStorageProvider } from '../../providers/storage/local-storage'

export default class ConfigAsCodeUpsert extends Command {
    static aliases = [
        'config:upsert',
        'config-as-code:upsert',
        'config:create',
        'config-as-code:create',
        'config:update',
        'config-as-code:update',
    ]

    static description = 'Create or update a config as code file at the given path'

    static flags = {
        ...Command.flags,
        path: flags.string({ description: 'The file path', dependsOn: ['content'] }),
        content: flags.string({ description: 'The YAML content', exclusive: ['files'] }),
        source: flags.string({ description: 'The path to a directory on the local filesystem that contains files to be upserted.  Source files must contain a valid Harness config as code path structure relative to the source directory.', exclusive: ['content'] }),
        sourcePattern: flags.string({ description: 'A glob pattern to limit files to include from source directory', default: '**/*.yaml' }),
        harnessUsername: flags.string({ description: '[DEPRECATED] The Harness username. Can also be set via HARNESS_USERNAME environment variable.', env: 'HARNESS_USERNAME' }),
        harnessPassword: flags.string({ description: '[DEPRECATED] The Harness password. Can also be set via HARNESS_PASSWORD environment variable.', env: 'HARNESS_PASSWORD' }),
    }

    async run() {
        const { flags } = this.parse(ConfigAsCodeUpsert)

        const harness = await this.getHarnessClientDeprecated(flags.harnessUsername, flags.harnessPassword)

        const storageProvider = new HarnessStorageProvider({ accountId: harness.accountId }, harness)
        await storageProvider.init()

        if (flags.path && flags.content) {
            const result = await storageProvider.storeFile({ path: flags.path, content: flags.content })
            this.log(result)
        } else if (flags.source) {
            const localfs = new LocalStorageProvider({ directory: flags.source })
            const files = await localfs.getFiles(flags.sourcePattern)
            const result = await storageProvider.storeFiles(files)
            this.log(result)
        } else {
            this.error('You must provide either the source directory or the path/content values')
        }
    }
}
