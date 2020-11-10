import { Step, StepType } from '../steps'
import { TemplateExecutionContext } from '../template'
import * as execa from 'execa'
import * as _ from 'lodash'

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
        console.log(opts)
        this.command = opts.command
        this.silent = opts.silent || false
        this.debug = opts.debug || false
        this.args = opts.args || {}
    }

    async run(context: TemplateExecutionContext): Promise<void> {
        const args = _.toPairs(this.args).filter(arg => !_.isUndefined(arg[1]))
        const argsWithStringValue = args.filter(arg => _.isString(arg[1])).map(pair => [`--${pair[0]}`, pair[1] as string])
        const argsWithBoolValue = args.filter(arg => _.isBoolean(arg[1]) && arg[1]).map(pair => [`--${pair[0]}`])
        const flattenedArgs = _.flatten([...argsWithStringValue, ...argsWithBoolValue])
        if (this.debug) {
            flattenedArgs.push('--debug')
        }
        console.log(flattenedArgs)
        const {stdout} = await execa('harness', [this.command, ...flattenedArgs], {
            env: {
                HARNESS_ACCOUNT: context.vars.destination.accountId,
                HARNESS_API_KEY: context.vars.destination.apiKey,
                HARNESS_USERNAME: context.vars.destination.username,
                HARNESS_PASSWORD: context.vars.destination.password,
                HARNESS_MANAGER_URL: context.vars.destination.managerUrl,
            },
        })
        console.log(stdout)
    }
}
