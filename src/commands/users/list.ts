import { BaseCommand as Command } from '../base-command'

export default class UsersList extends Command {
    static aliases = ['user:list', 'users:list']

    static description = 'List users'

    static flags = {
        ...Command.flags,
    }

    async run() {
        this.parse(UsersList)

        const harness = await this.getHarnessClient()

        const result = await harness.users.list()
        this.log(result)
    }
}
