import { Command, flags } from '@oclif/command'
import { Github } from '../../providers/github'
import { Harness } from '../../providers/harness/harness-api-client'
import { CredentialType } from '../../util/config'

export default class GithubRepoCreate extends Command {
  static description = 'Create a new GitHub Repository in an Organization'

  static args = [
  ]

  static flags = {
      owner: flags.string({ description: 'The owner of the repository', required: true }),
      repo: flags.string({ description: 'The repository name', required: true }),
      gitConnector: flags.string({ description: 'The name or id of the Harness git connector', required: true }),
      token: flags.string({ description: 'The GitHub token for authentication', required: true, env: 'GITHUB_TOKEN' }),
      baseUrl: flags.string({ description: 'The Github API base url', default: 'https://api.github.com', required: true }),
      harnessAccountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT_ID' }),
      harnessApiKey: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_API_KEY' }),
  }

  async run() {
      const { args, flags } = this.parse(GithubRepoCreate)

      const github = new Github({
          token: flags.token,
          type: CredentialType.Git,
      }, flags.baseUrl)

      const harness = new Harness({accountId: flags.harnessAccountId, apiKey: flags.harnessApiKey })
      await harness.init()

      const connector = await harness.connectors.git.get(flags.gitConnector)
      await github.createWebhook(flags.owner, flags.repo, connector.webhookUrl)
  }
}
