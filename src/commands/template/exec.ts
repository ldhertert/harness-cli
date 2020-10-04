import { Command, flags } from '@oclif/command'
import * as fs from 'fs'
import { Template } from '../../providers/templates/template'
import { GitStorageProvider } from '../../providers/storage/git-storage'
import { Credentials, CredentialType, GitCredentials } from '../../util/config'
import { GitOptions } from '../../util/git'
import * as _ from 'lodash'

export default class TemplateExec extends Command {
    static description = 'Apply steps defined in template manifest and send reults to target Harness account'

    static flags = {
        var: flags.string({ multiple: true, char: 'v' }),
        dest: flags.string({ required: true }),
        gitToken: flags.string({ env: 'GIT_TOKEN', description: 'Token to use for git authentication' }),
    }

    static args = [{ name: 'manifest', required: true }]

    async run() {
        const { args, flags } = this.parse(TemplateExec)

        const inputVars: any = { }
        for (const v of flags.var || []) {
            const parsed = this.parseVar(v)
            inputVars[parsed.key] = parsed.value
        }

        const templateText = await fs.promises.readFile(args.manifest, { encoding: 'utf-8' })
        this.log(`Successfully loaded template from ${args.manifest}`)
        const template = await this.parseTemplate(templateText)
        this.log(`Successfully parsed template '${template.name}'`)
        const vars = await this.processVariables(template, inputVars)
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

    async processVariables(template: Template, userVars: any) {
        const varsWithDefaultValues = template.variables.filter(v => v.defaultValue !== undefined)
        const defaults = _.mapValues(_.keyBy(varsWithDefaultValues, 'name'), 'defaultValue')
        const vars: any = {}
        _.defaults(vars, userVars, defaults)
        template.variables.forEach(v => {
            if (v.required && vars[v.name] === undefined) {
                throw new Error(`Missing required template variable ${v.name}`)
            }
        })
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

    parseVar(str: string) {
        const doubleQuotedKey = /^"(.*?)"=(.*)/.exec(str)
        const singleQuotedKey = /^'(.*?)'=(.*)/.exec(str)
        const unQuotedKey = /^(.*?)=(.*)/.exec(str)
        const match = doubleQuotedKey || singleQuotedKey || unQuotedKey
        if (!match || match.length !== 3) {
            throw new Error(`Unable to parse variable parameter: ${str}`)
        }
        const key = match[1]
        const doubleQuotedValue = /^"(.*)"/.exec(match[2])
        const singleQuotedValue = /^'(.*)'/.exec(match[2])
        const valueMatch = doubleQuotedValue || singleQuotedValue
        const value = valueMatch && valueMatch.length === 2 ? valueMatch[1] : match[2]
        return { key, value }
    }
}
