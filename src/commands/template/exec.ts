import { flags } from '@oclif/command'
import { BaseCommand as Command } from '../../base-command'
import * as fs from 'fs'
import { Template } from '../../providers/templates/template'
import * as yaml from 'js-yaml'
import axios from 'axios'
import { Harness } from '../../providers/harness/harness-api-client'
import { URL } from 'url'

export default class TemplateExec extends Command {
    static description = 'Apply steps defined in template manifest and send reults to target Harness account.'

    static flags = {
        ...Command.flags,
        manifest: flags.string({ description: 'A template manifest in either YAML or JSON format.  Can be a local file or URL.', required: true }),
        var: flags.string({ description: 'Set a variable specified within the template.  Format is --var "templateVar=My Value"', multiple: true, char: 'v' }),
        dryRun: flags.boolean({ description: 'Executes all template steps but does not push result to destination', default: false }),
        harnessUsername: flags.string({ description: 'The Harness username. This is required for now until the underlying APIs suport API key auth.  Can also be set via HARNESS_USERNAME environment variable.', env: 'HARNESS_USERNAME', required: true }),
        harnessPassword: flags.string({ description: 'The Harness password. This is required for now until the underlying APIs suport API key auth.  Can also be set via HARNESS_PASSWORD environment variable.', env: 'HARNESS_PASSWORD', required: true }),
        // gitUsername: flags.string({ env: 'GIT_USERNAME', description: 'Username to use for git authentication' }),
        // gitPassword: flags.string({ env: 'GIT_PASSWORD', description: 'Password to use for git authentication' }),
    }

    async run() {
        const { flags } = this.parse(TemplateExec)

        const inputVars: any = { }
        for (const v of flags.var || []) {
            const parsed = this.parseVar(v)
            inputVars[parsed.key] = parsed.value
        }

        const templateText = await this.loadTemplate(flags.manifest)
        this.log(`Successfully loaded template from ${flags.manifest}`)
        const template = await this.parseTemplate(templateText)
        this.log(`Successfully parsed template '${template.name}'`)

        try {
            // const harness = await this.getHarnessClient()
            const harness = new Harness({ accountId: this.context.config.harness.accountId || '', username: flags.harnessUsername, password: flags.harnessPassword })
            try {
                await harness.init()
            } catch (error) {
                this.error('Error initializing Harness API Client', { exit: false })
                this.error(error, { exit: 1 })
            }
            const ctx = {
                logger: {
                    log: this.log,
                    debug: this.debug,
                    error: this.error,
                },
            }
            const result = await template.execute(inputVars, harness, ctx, flags.dryRun)
            this.debug(result)
            // const localStorage = new LocalStorageProvider({ directory: './tmp' })
            // await localStorage.storeFiles(result.workspace)
            this.log('Success')
        } catch (ex) {
            this.error(ex)
            // this.error(JSON.stringify(ex, undefined, 4), { exit: 1 })
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
