import { flags } from '@oclif/command'
import { Github } from '../../providers/github'
import { CredentialType } from '../../util/config'
import { BaseCommand as Command } from '../../base-command'

export default class GithubRepoCreate extends Command {
  static description = 'Create a new webhook in a GitHub repo for a Harness git connector'

  static flags = {
      ...Command.flags,
      org: flags.string({ description: 'The Github organization', required: true }),
      repo: flags.string({ description: 'The repository name', required: true }),
      gitConnector: flags.string({ description: 'The name or id of the Harness git connector', required: true }),
      token: flags.string({ description: 'The GitHub token for authentication.  This can also be set via the environment variable GITHUB_TOKEN.', required: true, env: 'GITHUB_TOKEN' }),
      baseUrl: flags.string({ description: 'The Github API base url', default: 'https://api.github.com' }),
  }

  async run() {
      const { flags } = this.parse(GithubRepoCreate)

      const github = new Github({
          token: flags.token,
          type: CredentialType.Git,
      }, flags.baseUrl)

      const harness = await this.getHarnessClient()

      const connector = await harness.connectors.git.get(flags.gitConnector)
      await github.createWebhook(flags.org, flags.repo, connector.webhookUrl)
  }
}
