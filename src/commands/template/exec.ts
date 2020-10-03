import { Command, flags } from '@oclif/command'
import * as fs from 'fs'
import { Template } from '../../providers/templates/template'
import { GitStorageProvider } from '../../providers/storage/git-storage'
import { Credentials, CredentialType, GitCredentials } from '../../util/config'
import { GitOptions } from '../../util/git'

export default class TemplateExec extends Command {
  static description = 'Apply steps defined in template manifest and send reults to target Harness account'

  static flags = {
      var: flags.string({ multiple: true }),
      dest: flags.string({ required: true }),
      gitToken: flags.string({ env: 'GIT_TOKEN', description: 'Token to use for git authentication' }),
  }

  static args = [{ name: 'manifest', required: true }]

  async run() {
      const { args, flags } = this.parse(TemplateExec)

      const inputVars: any = { applicationName: 'Plex', serviceName: 'ombi4' }

      const templateText = await fs.promises.readFile(args.manifest, { encoding: 'utf-8' })
      this.log(`Successfully loaded template from ${args.manifest}`)
      const template = await this.parseTemplate(templateText)
      this.log(`Successfully parsed template '${template.name}'`)
      const vars = await this.processVariables(inputVars)
      this.log('Successfully proccessed variables')

      const credentials = await this.getCredentials(flags.gitToken)

      const destination = await this.getDestination(flags.dest, credentials)
      
      await template.execute(vars, destination, credentials)
      // this.log(JSON.stringify(template, undefined, 4))
  }

  async parseTemplate(templateText: string) {
      const parsedTemplate = JSON.parse(templateText)
      const template = new Template(parsedTemplate)
      return template
  }

  async getCredentials(gitToken?: string): Promise<Credentials[]> {
      const gitHubToken: GitCredentials = {
          type: CredentialType.Git,
          token: gitToken,
      }
      return Promise.resolve([
          gitHubToken,
      ])
  }

  async processVariables(userVars: any) {
      const vars = userVars
      // todo merge with flags
      return Promise.resolve(vars)
  }

  async getDestination(dest: string, credentials: Credentials[]) {
      // this needs to not be hard coded either
      const gitOptionsDest: GitOptions = {
          repo: dest,
          ref: 'master',
      }
      const destination = new GitStorageProvider(gitOptionsDest, credentials)
      return destination
  }
}
