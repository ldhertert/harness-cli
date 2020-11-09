import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'

export default class UsersDelete extends Command {
    static aliases = ['user:delete', 'users:delete']

    static description = 'Delete user by email/name/id'

    static flags = {
        ...Command.flags,
        name: flags.string({ description: 'The name of the user', char: 'n', exclusive: ['id', 'email'] }),
        id: flags.string({ description: 'The id of the user', exclusive: ['name', 'email'] }),
        email: flags.string({ description: 'The email of the user', exclusive: ['name', 'id'] }),
    }

    async run() {
        const { flags } = this.parse(UsersDelete)

        const harness = await this.getHarnessClient()

        const userRef = flags.name || flags.id || flags.email
        if (!userRef) {
            this.error('Email, id, or name is required.')
        }

        await harness.users.delete(userRef)
        this.log('Successfully deleted user')
    }
}
