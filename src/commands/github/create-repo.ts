import { Command, flags } from '@oclif/command'
import { Github, RepoVisibility } from '../../providers/github'
import { CredentialType } from '../../util/config'

export default class GithubRepoCreate extends Command {
  static description = 'Create a new GitHub Repository in an Organization'

  static flags = {
      org: flags.string({ description: 'The Github organization', required: true }),
      repo: flags.string({ description: 'The repository name', required: true }),
      token: flags.string({ description: 'The GitHub token for authentication.  This can also be set via the environment variable GITHUB_TOKEN.', required: true, env: 'GITHUB_TOKEN' }),
      description: flags.string({ description: 'A description of the application' }),
      baseUrl: flags.string({ description: 'The Github API base url', default: 'https://api.github.com' }),
      visibility: flags.enum<RepoVisibility>({ options: [RepoVisibility.PRIVATE, RepoVisibility.PUBLIC, RepoVisibility.INTERNAL], description: 'Visibility settings for the repository', default: RepoVisibility.PRIVATE }),
  }

  async run() {
      const { flags } = this.parse(GithubRepoCreate)

      const github = new Github({
          token: flags.token,
          type: CredentialType.Git,
      }, flags.baseUrl)
      await github.createRepo(flags.org, flags.repo, flags.description, flags.visibility)
  }
}
