import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'

export default class GroupsGet extends Command {
    static aliases = ['group:get', 'groups:get']
    static description = 'Get user group'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the group', char: 'n', exclusive: ['id'] }),
        id: flags.string({ description: 'The id of the group' }),
    }

    async run() {
        const { flags } = this.parse(GroupsGet)

        const harness = await this.getHarnessClient()

        const nameOrId = flags.name || flags.id
        if (!nameOrId) {
            this.error('Either name or id is required.')
        }

        const result = await harness.groups.get(nameOrId)
        this.log(result)
    }
}
