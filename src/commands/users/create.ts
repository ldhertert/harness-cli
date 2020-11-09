import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../../base-command'

export default class UsersCreate extends Command {
    static aliases = ['user:create', 'users:create']

    static description = 'Create user'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the user', char: 'n', required: true}),
        email: flags.string({ description: 'The email of the user', char: 'e', required: true}),
        group: flags.string({ description: 'The name or id of a Harness group', multiple: true, default: [] }),
    }

    async run() {
        const { flags } = this.parse(UsersCreate)

        const harness = await this.getHarnessClient()
        
        const groupIds = []
        this.log(flags.group)
        for (const group of flags.group) {
            groupIds.push((await harness.groups.get(group)).id)   
        }

        const result = await harness.users.create(flags.email, flags.name, groupIds)
        this.log(result)
    }
}
