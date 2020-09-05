/* eslint-disable */
import { Template } from './providers/templates/template'
import { FileSourceStep, RenameFileStep, SetValueStep, StepType } from './providers/templates/steps'
import { StorageType, StorageProviderRef } from './providers/storage/storage-provider'
import { GitStorageProvider, ConfigGit } from './providers/storage/git-storage'
import { VariableType } from './providers/templates/variables'
import { LocalStorageProvider } from './providers/storage/local-storage'
import * as fs from 'fs'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

async function run(): Promise<void> {

    let sourceTemplate = JSON.parse(await fs.promises.readFile('./template.json', { encoding: 'utf-8' }))
    let template = new Template(sourceTemplate.name);
    template.sourceFiles = sourceTemplate.sourceFiles;
    template.variables = sourceTemplate.variables;
    for (const step of sourceTemplate.steps) {
        if (step.type === StepType.FileSource) {
            template.steps.push(new FileSourceStep(step.name, step.source, step.glob))
        } else if (step.type === StepType.RenameFile) {
            template.steps.push(new RenameFileStep(step.name, step.search, step.replace, step.glob))
        } else if (step.type === StepType.SetValue) {
            template.steps.push(new SetValueStep(step.name, step.path, step.value, step.glob))
        } else {
            throw new Error("Invalid step type")
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
        }
    } as StorageProviderRef

    let inputVars: any = { applicationName: "Plex", serviceName: "ombi2" }
    const gitOptionsDest = {
        repo: 'https://github.com/ldhertert/luke-testing-harness.git',
        ref: 'master',
        auth: {
            token: process.env.GITHUB_TOKEN,
        },
    }
    const destination = new GitStorageProvider(gitOptionsDest)
    await destination.init()
    await template.execute(inputVars, destination)
}

run()
    .then(() => console.log('done'))
    .catch(error => { throw error })
