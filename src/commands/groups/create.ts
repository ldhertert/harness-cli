import { Command, flags } from '@oclif/command'
import { Harness } from '../../providers/harness/harness-api-client'
import { GroupOptions } from '../../providers/harness/user-groups'

export default class GroupsCreate extends Command {
    static description = 'Create a new user group. Note - not all functionality has been implemented yet'

    static args = [
        { name: 'name', description: 'The name of the application', required: true },
    ]

    static flags = {
        permissions: flags.string({ description: 'JSON encoded permissions object' }),
        /* users: flags.string({ multiple: true }),
        ssoGroup: flags.string({}),
        email: flags.string({}),
        teamsWebhook: flags.string({}),
        sendMailToNewMembers: flags.boolean({}),
        slackChannel: flags.string({}),
        slackWebhook: flags.string({}), */
        harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT' }),
        harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
    }

    async run() {
        const { args, flags } = this.parse(GroupsCreate)

        const harness = new Harness({ accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })

        const opts: GroupOptions = {}

        if (flags.permissions) {
            try {
                opts.permissions = JSON.parse(flags.permissions)
            } catch {
                this.error('Error parsing permissions.  Ensure JSON is valid.', { exit: 1 })
            }
        }

        const result = await harness.userGroups.create(args.name, opts)
        this.log(JSON.stringify(result, undefined, 4))
    }
}
