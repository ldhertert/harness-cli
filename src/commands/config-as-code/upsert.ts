import { BaseCommand as Command } from '../../base-command'
import { HarnessStorageProvider } from '../../providers/storage/harness-api-storage'
import { flags } from '@oclif/command'

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
        path: flags.string({ description: 'The file path', required: true }),
        content: flags.string({ description: 'The YAML content', required: true }),
    }

    async run() {
        const { flags } = this.parse(ConfigAsCodeUpsert)

        const harness = await this.getHarnessClient()
        const storageProvider = new HarnessStorageProvider({ accountId: harness.accountId }, harness)
        await storageProvider.init()

        await storageProvider.storeFile({ path: flags.path, content: flags.content })
        this.log(`Successfully stored ${flags.path}`)
    }
}
