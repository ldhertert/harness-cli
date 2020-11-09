import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../base-command'

export default class UsersCreate extends Command {
    static aliases = ['user:create', 'users:create']

    static description = 'Create user'

    static args = [
        { name: 'email', description: 'The email of the user', required: true },
        { name: 'name', description: 'The name of the user', required: true },
    ]

    static flags = {
        ...Command.flags,
        group: flags.string({ description: 'The name or id of a Harness group', multiple: true, default: [] }),
    }

    async run() {
        const { args, flags } = this.parse(UsersCreate)

        const harness = await this.getHarnessClient()
        
        const groupIds = []
        this.log(flags.group)
        for (const group of flags.group) {
            groupIds.push((await harness.groups.get(group)).id)   
        }

        const result = await harness.users.create(args.email, args.name, groupIds)
        this.log(result)
    }
}
