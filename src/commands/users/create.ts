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
        groups: flags.string({ multiple: true }),
    }

    async run() {
        const { args, flags } = this.parse(UsersCreate)

        const harness = await this.getHarnessClient()
        
        const groupIds = []
        for (const group of flags.groups) {
            groupIds.push((await harness.groups.get(group)).id)   
        }

        const result = await harness.users.create(args.email, args.name, groupIds)
        this.log(result)
    }
}
