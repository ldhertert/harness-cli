import { BaseCommand as Command } from '../base-command'

export default class GroupsDelete extends Command {
    static aliases = ['group:delete', 'groups:delete']
    static description = 'Delete user group'

    static args = [
        { name: 'nameOrId', description: 'The name or id of the user group', required: true },
    ]

    static flags = {
        ...Command.flags,
    }

    async run() {
        const { args } = this.parse(GroupsDelete)

        const harness = await this.getHarnessClient()

        await harness.groups.delete(args.nameOrId)
        this.log('Successfully deleted group')
    }
}
