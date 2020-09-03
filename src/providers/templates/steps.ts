import { StorageProviderRef, getStorageProvider } from '../storage/storage-provider'
import { TemplateExecutionContext } from './template'
import * as minimatch from 'minimatch'
import _ = require('lodash');
import { fromYaml, toYaml } from '../../util/objects'

enum StepType {
    FileSource = 'FileSource',
    RenameFile = 'RenameFile',
    SetValue = 'SetValue',
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
    glob?: string;
    // condition?: unknown

    public constructor(name: string) {
        this.name = name
    }

    abstract async run(context: TemplateExecutionContext): Promise<void>
}

export class FileSourceStep extends Step {
    type = StepType.FileSource

    source: StorageProviderRef

    public constructor(name: string, source: StorageProviderRef, glob?: string) {
        super(name)
        this.source = source
        this.glob = glob || '**/*.yaml'
    }

    public async run(context: TemplateExecutionContext): Promise<void> {
        const storageProvider = getStorageProvider(this.source)
        await storageProvider.init()
        const files = await storageProvider.getFiles(this.glob as string)
        
        files.forEach(newFile => {
            const existingFiles = context.workspace.filter(existingFile => newFile.path.toLowerCase() === existingFile.path.toLowerCase())
            if (existingFiles.length > 0) {
                existingFiles.forEach(f => {
                    f.content = newFile.content
                })
            } else {
                context.workspace.push(newFile)
            }
        })
    }
}

export class RenameFileStep extends Step {
    type = StepType.RenameFile
    replace: string;
    search: RegExp | string;

    public constructor(name: string, search: RegExp | string, replace: string, glob?: string) {
        super(name)
        this.search = search
        this.replace = replace
        this.glob = glob || '**/*.yaml'
    }

    public async run(context: TemplateExecutionContext): Promise<void> {
        const filesToProcess = context.workspace.filter(file => minimatch(file.path, this.glob as string))
        filesToProcess.forEach(file => {
            const newPath = _.template(this.replace)(context.vars)
            file.path = _.replace(file.path, this.search, newPath)
        })
        return Promise.resolve()
    }
}

export class SetValueStep extends Step {
    type = StepType.SetValue
    path: string;
    value: any;

    public constructor(name: string, path: string, value: any, glob?: string) {
        super(name)
        this.path = path
        this.value = value
        this.glob = glob || '**/*.yaml'
    }

    public async run(context: TemplateExecutionContext): Promise<void> {
        const filesToProcess = context.workspace.filter(file => minimatch(file.path, this.glob as string))
        filesToProcess.forEach(file => {
            const obj = fromYaml(file.content)
            _.set(obj, this.path, this.value)
            file.content = toYaml(obj)
        })
        return Promise.resolve()
    }
}
