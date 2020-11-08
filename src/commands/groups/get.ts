import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../base-command'
import { Harness } from '../../providers/harness/harness-api-client'

export default class GroupsGet extends Command {
    static description = 'Get user groups'

    static args = [
        { name: 'nameOrId', description: 'The name or id of the user group', required: true },
    ]

    static flags = {
        ...Command.flags,
    }

    async run() {
        const { args } = this.parse(GroupsGet)

        const harness = await this.getHarnessClient()

        const result = await harness.groups.get(args.nameOrId)
        this.log(result)
    }
}
