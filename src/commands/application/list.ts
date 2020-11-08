import { BaseCommand } from '../base-command'

export default class ApplicationsList extends BaseCommand {
  static aliases = ['app:list', 'apps:list', 'applications:list', 'application:list']

  static description = 'List Applications'

  static flags = {
      ...BaseCommand.flags,
  }

  async run() {
      const harness = await this.getHarnessClient()

      const apps = await harness.applications.list()
      this.log(apps)
  }
}
