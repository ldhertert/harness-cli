import { Command, flags } from '@oclif/command'
import * as fs from 'fs'
import { Template } from '../../providers/templates/template'
import * as _ from 'lodash'
import { Harness } from '../../providers/harness/harness-api-client'

export default class TemplateExec extends Command {
    static description = 'Apply steps defined in template manifest and send reults to target Harness account'

    static flags = {
        var: flags.string({ multiple: true, char: 'v' }),
        managerUrl: flags.string({ description: 'The Harness Manager URL', default: 'https://app.harness.io', env: 'HARNESS_MANAGER_URL' }),
        accountId: flags.string({ description: 'The Harness Account Id', required: true, env: 'HARNESS_ACCOUNT_ID' }),
        username: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_USERNAME' }),
        password: flags.string({ description: 'The Harness API Key', required: true, env: 'HARNESS_PASSWORD' }),
        gitUsername: flags.string({ env: 'GIT_USERNAME', description: 'Username to use for git authentication' }),
        gitPassword: flags.string({ env: 'GIT_PASSWORD', description: 'Password to use for git authentication' }),
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

        const destination = new Harness({ 
            url: flags.managerUrl,
            accountId: flags.accountId,
            username: flags.username,
            password: flags.password,
        })
        await destination.init()
        await template.execute(vars, destination)
        // this.log(JSON.stringify(template, undefined, 4))
    }

    async parseTemplate(templateText: string) {
        const parsedTemplate = JSON.parse(templateText)
        const template = new Template(parsedTemplate)
        return template
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
