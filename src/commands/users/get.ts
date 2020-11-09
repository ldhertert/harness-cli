import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'

export default class UsersGet extends Command {
    static aliases = ['user:get', 'users:get']

    static description = 'Get user by email/name/id'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the user', char: 'n', exclusive: ['id', 'email'] }),
        id: flags.string({ description: 'The id of the user', exclusive: ['name', 'email'] }),
        email: flags.string({ description: 'The email of the user', exclusive: ['name', 'id'] }),
    }

    async run() {
        const { flags } = this.parse(UsersGet)

        const harness = await this.getHarnessClient()

        const userRef = flags.name || flags.id || flags.email
        if (!userRef) {
            this.error('Email, id, or name is required.')
        }

        const result = await harness.users.get(userRef)
        this.log(result)
    }
}
