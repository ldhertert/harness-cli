import { Step, StepType } from '../steps'
import { TemplateExecutionContext } from '../template'
import execa from 'execa'
import _ from 'lodash'

interface Dict<T> {
    [key: string]: T | undefined;
}

export interface CommandOptions {
    command: string
    args?: Dict<string | boolean>
    silent?: boolean
    debug?: boolean
}

export class RunHarnessCLICommand extends Step {
    type = StepType.HarnessCLICommand
    command: string
    args: Dict<string | boolean>
    silent: boolean
    debug: boolean

    public constructor(name: string, opts: CommandOptions) {
        super(name, [])
        this.command = opts.command
        this.silent = opts.silent || true
        this.debug = opts.debug || false
        this.args = opts.args || {}
    }

    async run(context: TemplateExecutionContext): Promise<void> {
        const templatedArgs = this.renderTemplate(this.args, context)
        const args = _.toPairs(templatedArgs).filter(arg => !_.isUndefined(arg[1]))
        const argsWithStringValue = args.filter(arg => _.isString(arg[1])).map(pair => [`--${pair[0]}`, pair[1] as string])
        const argsWithBoolValue = args.filter(arg => _.isBoolean(arg[1]) && arg[1]).map(pair => [`--${pair[0]}`])
        const flattenedArgs = _.flatten([...argsWithStringValue, ...argsWithBoolValue])
        if (this.debug) {
            flattenedArgs.push('--debug')
        }
        const env = {
            HARNESS_ACCOUNT: context.vars.destination.accountId,
            HARNESS_API_KEY: context.vars.destination.apiKey,
            HARNESS_USERNAME: context.vars.destination.username,
            HARNESS_PASSWORD: context.vars.destination.password,
            HARNESS_MANAGER_URL: context.vars.destination.managerUrl,
        }
        const {stdout, stderr} = await execa('harness', [this.command, ...flattenedArgs], {
            env,
        })

        context.logger.debug({
            stdout,
            stderr,
            env,
            command: this.command,
            flattenedArgs,
        })
    }
}
