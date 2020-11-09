import { BaseCommand as Command } from '../base-command'

export default class UsersDelete extends Command {
    static aliases = ['user:delete', 'users:delete']

    static description = 'Delete user by email/name/id'

    static args = [
        { name: 'user', description: 'The email, name, or id of the user', required: true },
    ]

    static flags = {
        ...Command.flags,
    }

    async run() {
        const { args } = this.parse(UsersDelete)

        const harness = await this.getHarnessClient()

        await harness.users.delete(args.user)
        this.log('Successfully deleted user')
    }
}
