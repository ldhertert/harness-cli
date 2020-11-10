import { StepType } from '../steps'
import { RunHarnessCLICommand } from './run-harness-cli-command'

export type CreateApplicationStepOptions = {
    applicationName: string,
    description?: string,
    gitConnector?: string,
    debug?: boolean,
    branch?: string,
}

export class CreateApplicationStep extends RunHarnessCLICommand {
    type = StepType.CreateApplication;
    public constructor(stepName: string, opts: CreateApplicationStepOptions) {
        super(stepName, {
            command: 'apps:create',
            args: {
                name: opts.applicationName,
                description: opts.description,
                gitConnector: opts.gitConnector,
                syncEnabled: Boolean(opts.gitConnector),
                branch: opts.branch,
            },
            debug: opts.debug,
        })
    }
}
