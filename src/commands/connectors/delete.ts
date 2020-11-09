import { BaseCommand as Command } from '../base-command'

export default class ConnectorDelete extends Command {
  static aliases = ['connector:delete', 'connectors:delete']
  static description = 'Delete connector'

  static args = [
      { name: 'nameOrId', description: 'The name or id of the connector', required: true },
  ]

  static flags = {
      ...Command.flags,
  }

  async run() {
      const { args } = this.parse(ConnectorDelete)

      const harness = await this.getHarnessClient()

      await harness.connectors.git.delete(args.nameOrId)
      this.log('Successfully deleted connector')
  }
}
