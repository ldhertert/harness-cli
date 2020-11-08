import { BaseCommand as Command } from '../base-command'

export default class GroupsList extends Command {
    static description = 'List User groups'

    static flags = {
        ...Command.flags,
    }

    async run() {
        const harness = await this.getHarnessClient()

        const result = await harness.groups.list()
        this.log(result)
    }
}
