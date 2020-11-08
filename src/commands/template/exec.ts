import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../base-command'
import * as fs from 'fs'
import { Template } from '../../providers/templates/template'
import * as _ from 'lodash'
import * as yaml from 'js-yaml'
import axios from 'axios'

export default class TemplateExec extends Command {
    static description = 'Apply steps defined in template manifest and send reults to target Harness account'

    static flags = {
        ...Command.flags,
        var: flags.string({ multiple: true, char: 'v' }),
        // gitUsername: flags.string({ env: 'GIT_USERNAME', description: 'Username to use for git authentication' }),
        // gitPassword: flags.string({ env: 'GIT_PASSWORD', description: 'Password to use for git authentication' }),
    }

    static args = [{ name: 'manifest', description: 'A template manifest in either YAML or JSON format.  Can be a local file or URL.', required: true }]

    async run() {
        const { args, flags } = this.parse(TemplateExec)

        const inputVars: any = { }
        for (const v of flags.var || []) {
            const parsed = this.parseVar(v)
            inputVars[parsed.key] = parsed.value
        }

        const templateText = await this.loadTemplate(args.manifest)
        this.log(`Successfully loaded template from ${args.manifest}`)
        const template = await this.parseTemplate(templateText)
        this.log(`Successfully parsed template '${template.name}'`)
        const vars = await this.processVariables(template, inputVars)
        this.log('Successfully proccessed variables')

        try {
            const harness = await this.getHarnessClient()

            const result = await template.execute(vars, harness)
            this.debug(result)
            // const localStorage = new LocalStorageProvider({ directory: './tmp' })
            // await localStorage.storeFiles(result.workspace)
            this.log('Success')
        } catch (ex) {
            this.error(JSON.stringify(ex, undefined, 4), { exit: 1 })
        }
    }

    async loadTemplate(path: string) {
        try {
            // try to parse as url
            // eslint-disable-next-line no-new
            new URL(path)
            const response = await axios.get(path)
            return response.data
        } catch {}

        try {
            const templateText = await fs.promises.readFile(path, { encoding: 'utf-8' })
            return templateText        
        } catch {}

        throw new Error(`Error loading template from ${path}`)
    }

    async parseTemplate(templateText: string) {
        let parsedTemplate: string
        try {
            parsedTemplate = JSON.parse(templateText)
        } catch {
            try {
                parsedTemplate = yaml.load(templateText)
            } catch {
                throw new Error('Template is not valid JSON or YAML.')
            }
        }
        return new Template(parsedTemplate)
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
