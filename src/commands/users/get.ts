import { BaseCommand as Command } from '../base-command'

export default class UsersGet extends Command {
    static aliases = ['user:get', 'users:get']

    static description = 'Get users'

    static args = [
        { name: 'user', description: 'The email, name, or id of the user', required: true },
    ]

    static flags = {
        ...Command.flags,
    }

    async run() {
        const { args } = this.parse(UsersGet)

        const harness = await this.getHarnessClient()

        const result = await harness.users.get(args.user)
        this.log(result)
    }
}
