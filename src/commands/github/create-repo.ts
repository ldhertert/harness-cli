import { Command, flags } from '@oclif/command'
import { Github, RepoVisibility } from '../../providers/github'
import { CredentialType } from '../../util/config'

export default class GithubRepoCreate extends Command {
  static description = 'Create a new GitHub Repository in an Organization'

  static args = [
      { name: 'org', description: 'The Github Organization', required: true },
      { name: 'name', description: 'The repository name', required: true },
  ]

  static flags = {
      token: flags.string({ description: 'The GitHub token for authentication', required: true, env: 'GITHUB_TOKEN' }),
      description: flags.string({ description: 'A description of the application' }),
      baseUrl: flags.string({ description: 'The Github API base url', default: 'https://api.github.com', required: true }),
      visibility: flags.enum<RepoVisibility>({ options: [RepoVisibility.PRIVATE, RepoVisibility.PUBLIC, RepoVisibility.INTERNAL], description: 'Visibility settings for the repository', default: RepoVisibility.PRIVATE }),
  }

  async run() {
      const { args, flags } = this.parse(GithubRepoCreate)

      const github = new Github({
          token: flags.token,
          type: CredentialType.Git,
      }, flags.baseUrl)
      await github.createRepo(args.org, args.name, flags.description, flags.visibility)
  }
}
