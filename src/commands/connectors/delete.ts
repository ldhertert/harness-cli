import { BaseCommand as Command } from '../../base-command'
import { flags } from '@oclif/command'
import { ConnectorType } from '../../providers/harness/connectors/connectors'

export default class ConnectorDelete extends Command {
  static aliases = ['connector:delete', 'connectors:delete']
  static description = 'Delete connector'

  static flags = {
      ...Command.flags,
      name: flags.string({ description: 'The name of the connector', char: 'n', exclusive: ['id'] }),
      id: flags.string({ description: 'The id of the connector' }),
      type: flags.enum<ConnectorType>({ options: [ConnectorType.Docker, ConnectorType.Git], required: true }),
  }

  async run() {
      const { flags } = this.parse(ConnectorDelete)

      const harness = await this.getHarnessClient()

      const nameOrId = flags.name || flags.id
      if (!nameOrId) {
          this.error('Either name or id is required.')
      }
      await harness.connectors.delete(nameOrId, flags.type)
      this.log('Successfully deleted connector')
  }
}
