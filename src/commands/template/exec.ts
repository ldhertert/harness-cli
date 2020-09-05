import { Command, flags } from '@oclif/command'
import * as fs from 'fs'
import { Template } from '../../providers/templates/template'
import { StepType, FileSourceStep, RenameFileStep, SetValueStep } from '../../providers/templates/steps'
import { StorageType, StorageProviderRef } from '../../providers/storage/storage-provider'
import { GitStorageProvider } from '../../providers/storage/git-storage'

export default class TemplateExec extends Command {
  static description = 'Apply steps defined in template manifest and send reults to target Harness account'

  static flags = {
      var: flags.string({ multiple: true }),
      dest: flags.string({ required: true }),
  }

  static args = [{ name: 'manifest', required: true }]

  async run() {
      const { args, flags } = this.parse(TemplateExec)

      const inputVars: any = { applicationName: 'Plex', serviceName: 'ombi3' }

      const templateText = await fs.promises.readFile(args.manifest, { encoding: 'utf-8' })
      this.log(`Successfully loaded template from ${args.manifest}`)
      const template = await this.parseTemplate(templateText)
      this.log(`Successfully parsed template '${template.name}'`)
      const vars = await this.processVariables(inputVars, args, flags)
      this.log('Successfully proccessed variables')
      const destination = await this.getDestination()
      await template.execute(vars, destination)
      this.log(JSON.stringify(template, undefined, 4))
  }

  async parseTemplate(templateText: string) {
      const sourceTemplate = JSON.parse(templateText)

      const template = new Template(sourceTemplate.name)
      template.sourceFiles = sourceTemplate.sourceFiles
      template.variables = sourceTemplate.variables
      for (const step of sourceTemplate.steps) {
          if (step.type === StepType.FileSource) {
              template.steps.push(new FileSourceStep(step.name, step.source, step.glob))
          } else if (step.type === StepType.RenameFile) {
              template.steps.push(new RenameFileStep(step.name, step.search, step.replace, step.glob))
          } else if (step.type === StepType.SetValue) {
              template.steps.push(new SetValueStep(step.name, step.path, step.value, step.glob))
          } else {
              throw new Error('Invalid step type')
          }
      }

      // this is a hack 
      (template.steps[0] as FileSourceStep).source = {
          sourceType: StorageType.Git,
          opts: {
              repo: 'https://github.com/ldhertert/luke-testing-harness.git',
              ref: 'master',
              auth: {
                  token: process.env.GITHUB_TOKEN,
              },
          },
      } as StorageProviderRef

      return template
  }

  async processVariables(userVars: any, args: any, flags: any) {
      const vars = userVars
      // todo merge with flags
      return Promise.resolve(vars)
  }

  async getDestination() {
      // this needs to not be hard coded either
      const gitOptionsDest = {
          repo: 'https://github.com/ldhertert/luke-testing-harness.git',
          ref: 'master',
          auth: {
              token: process.env.GITHUB_TOKEN,
          },
      }
      const destination = new GitStorageProvider(gitOptionsDest)
      await destination.init()
      return destination
  }
}
