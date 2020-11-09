import { flags } from '@oclif/command'
import { Github } from '../../providers/github'
import { CredentialType } from '../../util/config'
import { BaseCommand as Command } from '../../base-command'

export default class GithubRepoDelete extends Command {
  static description = 'Delete a GitHub Repository in an Organization'

  static flags = {
      ...Command.flags,
      org: flags.string({ description: 'The Github organization', required: true }),
      repo: flags.string({ description: 'The repository name', required: true }),
      token: flags.string({ description: 'The GitHub token for authentication.  This can also be set via the environment variable GITHUB_TOKEN.', required: true, env: 'GITHUB_TOKEN' }),
      baseUrl: flags.string({ description: 'The Github API base url', default: 'https://api.github.com' }),
  }

  async run() {
      const { flags } = this.parse(GithubRepoDelete)

      const github = new Github({
          token: flags.token,
          type: CredentialType.Git,
      }, flags.baseUrl)

      await github.deleteRepo(flags.org, flags.repo)
      this.log('Successfully deleted repo')
  }
}
