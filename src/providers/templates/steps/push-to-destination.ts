import { StepType, Step } from '../steps'
import { TemplateExecutionContext } from '../template'
import { File } from '../../../util/filesystem'
import minimatch from 'minimatch'
import { HarnessStorageProvider } from '../../storage/harness-api-storage'
import { HarnessApiOptions, Harness } from '../../harness/harness-api-client'
import _ from 'lodash'

export type PushToDestinationOptions = {
    destination?: HarnessApiOptions
    files: string[]
}

export class PushToDestination extends Step {
    type = StepType.PushToDestination
    destination?: HarnessApiOptions

    public constructor(name: string, opts: PushToDestinationOptions) {
        super(name, opts.files)
        this.destination = opts.destination
    }

    async run(context: TemplateExecutionContext): Promise<void> {
        this.destination = _.defaults(this.destination || {}, context.vars.destination)

        this.renderTemplate(this.destination, context)

        let filesToPush: File[] = []
        for (const glob of this.files) {
            filesToPush = filesToPush.concat(context.workspace.filter(file => {
                const isMatch = minimatch(file.path, glob)
                if (!isMatch) {
                    context.logger.debug(`"${file.path}" was excluded by glob pattern ${glob}.`)
                }
                return isMatch
            }))
        }

        if (!context.dryRun && filesToPush.length > 0) {
            context.logger.log(`Pushing ${filesToPush.length} files to destination`)
            const harness = new Harness(context.vars.destination)
            const destinationStorage = new HarnessStorageProvider(harness)
            await destinationStorage.init()

            context.logger.log('Initialized destination storage provider.')

            try {
                const pushResult = await destinationStorage.storeFiles(filesToPush)
                context.logger.log(pushResult)

                if (pushResult.responseStatus === 'FAILED') {
                    const failedFiles = pushResult.filesStatus
                        .filter((f: { status: string }) => f.status === 'FAILED')
                        .map((f: { yamlFilePath: string; errorMssg: string }) => `\t'${f.yamlFilePath}': ${f.errorMssg}`)
                    throw new Error(`Error pushing files to destination. The following files failed:\n${failedFiles.join('\n')}`)
                }
                await destinationStorage.dispose()
                context.logger.log('Pushed files to destination.')
            } catch (err) {
                context.logger.log(err)
            }
        }
    }
}