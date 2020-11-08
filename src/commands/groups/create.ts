import { flags } from '@oclif/command'
import { GroupOptions } from '../../providers/harness/groups'
import { BaseCommand as Command } from '../base-command'

export default class GroupsCreate extends Command {
    static aliases = ['group:create', 'groups:create']

    static description = 'Create a new user group. Note - not all functionality has been implemented yet'

    static args = [
        { name: 'name', description: 'The name of the group', required: true },
    ]

    static flags = {
        ...Command.flags,
        permissions: flags.string({ description: 'JSON encoded permissions object' }),
        copyPermissionFrom: flags.string({ description: 'Copy permissions from an existing group.', exclusive: ['permissions']}),
        applicationScope: flags.string({ description: 'An application id or name.  This will replace any Application Restrictions with the provided applications.  Multiple values are allowed', multiple: true }),
        /* users: flags.string({ multiple: true }),
        ssoGroup: flags.string({}),
        groupEmail: flags.string({}),
        teamsWebhook: flags.string({}),
        sendMailToNewMembers: flags.boolean({}),
        slackChannel: flags.string({}),
        slackWebhook: flags.string({}), */
    }

    async run() {
        const { args, flags } = this.parse(GroupsCreate)

        const harness = await this.getHarnessClient()

        const opts: GroupOptions = {}

        if (flags.permissions) {
            try {
                opts.permissions = JSON.parse(flags.permissions)
            } catch {
                this.error('Error parsing permissions.  Ensure JSON is valid.', { exit: 1 })
            }
        } else if (flags.copyPermissionFrom) {
            const sourceGroup = await harness.groups.get(flags.copyPermissionFrom)
            opts.permissions = sourceGroup.permissions
        }

        if (flags.applicationScope?.length > 0) {
            const appIds: string[] = []
            for (const appRef of flags.applicationScope) {
                appIds.push((await harness.applications.get(appRef)).id)
            }

            // Replace all application filters with the provided application ids
            opts.permissions?.appPermissions
                .filter((p: { applications: { filterType: null } }) => p.applications?.filterType === null)
                .forEach((p: { applications: { appIds: string[] } }) => {
                    p.applications.appIds = appIds
                })
        }

        // this.log(JSON.stringify(opts, undefined, 4))

        const result = await harness.groups.create(args.name, opts)
        this.log(result)
    }
}
