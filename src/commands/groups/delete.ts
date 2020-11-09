import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'

export default class GroupsDelete extends Command {
    static aliases = ['group:delete', 'groups:delete']
    static description = 'Delete user group'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the group', char: 'n', exclusive: ['id'] }),
        id: flags.string({ description: 'The id of the group' }),
    }

    async run() {
        const { flags } = this.parse(GroupsDelete)

        const harness = await this.getHarnessClient()

        const nameOrId = flags.name || flags.id
        if (!nameOrId) {
            this.error('Either name or id is required.')
        }

        await harness.groups.delete(nameOrId)
        this.log('Successfully deleted group')
    }
}
