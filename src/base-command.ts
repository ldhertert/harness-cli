import Command, { flags } from '@oclif/command'
import * as _ from 'lodash'
import { Harness } from './providers/harness/harness-api-client'
import {Input, OutputArgs, OutputFlags } from '@oclif/parser'

export abstract class BaseCommand extends Command {
    static flags = {
        debug: flags.boolean({ hidden: true, description: 'Print debug logs to stdout.', env: 'HARNESS_CLI_DEBUG' }),
        select: flags.string({ hidden: true, description: 'Apply expression to output prior to printing' }),
        managerUrl: flags.string({ hidden: true, description: 'The Harness Manager URL.  Can also be set via HARNESS_MANAGER_URL environment variable', default: 'https://app.harness.io', env: 'HARNESS_MANAGER_URL' }),
        harnessAccountId: flags.string({ hidden: true, description: 'The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment variable.', env: 'HARNESS_ACCOUNT' }),
        harnessApiKey: flags.string({ hidden: true, description: 'The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.', env: 'HARNESS_API_KEY' }),
        silent: flags.boolean({ hidden: true, description: 'Supress stdout logging', default: false, char: 's', env: 'HARNESS_CLI_SILENT' }),
    }

    context!: {
        args: OutputArgs<any>;
        flags: OutputFlags<typeof BaseCommand.flags> ;
        config: {
            debug: boolean;
            harness: {
                accountId?: string,
                apiKey?: string,
            }
        };
        logger: {
            log: (message: any) => void;
            debug: (...args: any[]) => void;
            error: { (input: string | Error, options: { code?: string | undefined; exit: false; }): void; (input: string | Error, options?: { code?: string | undefined; exit?: number | undefined; } | undefined): never; };
        };
    };

    log(message: any) {
        if (this.context?.flags.silent) {
            return
        }

        if (_.isObject(message) && this.context?.flags.select) {
            message = _.get(message, this.context.flags.select, message)
        }
        
        if (_.isObject(message)) {
            console.log(JSON.stringify(message, undefined, 4))
        } else {
            console.log(message)
        }
    }
    debug = (message: any) => {
        if (this.context?.config.debug) {
            this.log(message)
        }
    }

    async init() {
        // do some initialization
        // const { args, flags } = this.parse(BaseCommand)
        const { args, flags } = this.parse(this.constructor as Input<typeof BaseCommand.flags>)
        const parsedArgs: OutputArgs<any> = args
        const parsedFlags: OutputFlags<typeof BaseCommand.flags> = flags
        this.context = {
            args: parsedArgs,
            flags: parsedFlags,
            config: {
                debug: parsedFlags.debug,
                harness: {
                    accountId: parsedFlags.harnessAccountId,
                    apiKey: parsedFlags.harnessApiKey,
                },
            },
            logger: {
                log: this.log,
                debug: this.debug,
                error: this.error,
            },
        }

        // For some reason, HARNESS_CLI_SILENT is not being respected
        this.context.flags.silent = !this.context.flags.debug && (this.context.flags.silent || process.env.HARNESS_CLI_SILENT === 'true')

        this.debug(flags)
    }

    async getHarnessClient() {
        if (this.context.config.harness.accountId && this.context.config.harness.apiKey) {
            const client = new Harness({ accountId: this.context.config.harness.accountId, apiKey: this.context.config.harness.apiKey})
            try {
                await client.init()
                return client
            } catch (error) {
                this.error('Error initializing Harness API Client', { exit: false })
                this.error(error, { exit: 1 })
            }
        } else {
            this.error('The arguments harnessAccountId and harnessApiKey are required.')
        }
    }
}
