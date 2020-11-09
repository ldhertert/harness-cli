import { BaseCommand as Command } from '../../base-command'
import { HarnessStorageProvider } from '../../providers/storage/harness-api-storage'

export default class ConfigAsCodeListFiles extends Command {
    static aliases = ['config:list', 'config-as-code:list-files']

    static description = 'List file tree for config-as-code'

    static flags = {
        ...Command.flags,
    }

    async run() {
        this.parse(ConfigAsCodeListFiles)

        const harness = await this.getHarnessClient()
        const storageProvider = new HarnessStorageProvider({ accountId: harness.accountId }, harness)
        await storageProvider.init()

        const result = storageProvider.files
        this.log(result.map(file => file.path))
    }
}
