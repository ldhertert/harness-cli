import { StorageProviderRef } from '../storage/storage-provider'
import { TemplateExecutionContext } from './template'
import * as minimatch from 'minimatch'
import _ = require('lodash');
import { fromYaml, toYaml, getStorageProvider } from '../../util/objects'
import { File } from '../../util/filesystem'

export enum StepType {
    FileSource = 'FileSource',
    RenameFile = 'RenameFile',
    SetValue = 'SetValue',
    CreateApplication = 'CreateApplication',
    RegexReplace = 'RegexReplace',
    RunContainer = 'RunContainer',
    JSONPatch = 'JSONPatch',
    DeleteFile = 'DeleteFile',
    RenderTemplate = 'RenderTemplate',
    GraphQL = 'GraphQL',
    ExecuteTemplate = 'ExecuteTemplate',
}

export abstract class Step {
    name: string;
    description?: string;
    abstract type: StepType;
    files: string[];
    // condition?: unknown

    public constructor(name: string, files: string[]) {
        this.name = name
        this.files = files
    }

    abstract async run(context: TemplateExecutionContext): Promise<void>
}

export class FileSourceStep extends Step {
    type = StepType.FileSource

    source: StorageProviderRef

    public constructor(name: string, source: StorageProviderRef, files: string[]) {
        super(name, files)
        this.source = source
    }

    public async run(context: TemplateExecutionContext): Promise<void> {
        const storageProvider = getStorageProvider(this.source, context)
        await storageProvider.init()
        let files: File[] = []
        for (const glob of this.files) {
            files = files.concat(await storageProvider.getFiles(glob))
        }
        
        files.forEach((newFile: File) => {
            const existingFiles = context.workspace.filter(existingFile => newFile.path.toLowerCase() === existingFile.path.toLowerCase())
            if (existingFiles.length > 0) {
                existingFiles.forEach(f => {
                    f.content = newFile.content
                })
            } else {
                context.workspace.push(newFile)
            }
        })
        await storageProvider.dispose()
    }
}

export class RenameFileStep extends Step {
    type = StepType.RenameFile
    replace: string;
    search: RegExp | string;

    public constructor(name: string, search: RegExp | string, replace: string, files: string[]) {
        super(name, files)
        this.search = search
        this.replace = replace
    }

    public async run(context: TemplateExecutionContext): Promise<void> {
        let filesToProcess: File[] = []
        for (const glob of this.files) {
            filesToProcess = filesToProcess.concat(context.workspace.filter(file => minimatch(file.path, glob)))
        }
        filesToProcess.forEach(file => {
            let templatedSearch = this.search
            const templatedReplace = _.template(this.replace)(context.vars)
            if (typeof templatedSearch === 'string') {
                templatedSearch = _.template(templatedSearch)(context.vars)
            }
            file.path = _.replace(file.path, templatedSearch, templatedReplace)
        })
        return Promise.resolve()
    }
}

export class SetValueStep extends Step {
    type = StepType.SetValue
    path: string;
    value: any;

    public constructor(name: string, path: string, value: any, files: string[]) {
        super(name, files)
        this.path = path
        this.value = value
    }

    public async run(context: TemplateExecutionContext): Promise<void> {
        let filesToProcess: File[] = []
        for (const glob of this.files) {
            filesToProcess = filesToProcess.concat(context.workspace.filter(file => minimatch(file.path, glob)))
        }
        filesToProcess.forEach(file => {
            const obj = fromYaml(file.content)
            _.set(obj, this.path, this.value)
            file.content = toYaml(obj)
        })
        return Promise.resolve()
    }
}

export class CreateApplicationStep extends Step {
    type = StepType.CreateApplication
    applicationName: string;

    public constructor(name: string, applicationName: string) {
        super(name, [])
        this.applicationName = applicationName
    }

    run(context: TemplateExecutionContext): Promise<void> {
        const name = _.template(this.applicationName)(context.vars)
        console.log(name)
        return Promise.resolve()
    }
}
