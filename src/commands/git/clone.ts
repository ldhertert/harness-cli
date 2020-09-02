import {Command, flags} from '@oclif/command'
import { Git } from '../../util/git'

export default class GitClone extends Command {
  static description = 'describe the command here'

  static flags = {
    ref: flags.string({ default: 'master' }),
  }

  static args = [{name: 'repo'}]

  async run() {
    const {args, flags} = this.parse(GitClone)

    const git = new Git(args.repo, {
      ref: flags.ref,
      cwd: '/Users/lukehertert/code/harness-cli/workspace',
      auth: {},
    })
    await git.clone()
  }
}
