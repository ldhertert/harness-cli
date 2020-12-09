import { StorageProviderRef } from '../storage/storage-provider'
import { TemplateExecutionContext } from './template'
import minimatch from 'minimatch'
import _ = require('lodash');
import { fromYaml, toYaml, getStorageProvider } from '../../util/objects'
import { File } from '../../util/filesystem'
import traverse from 'traverse'

export enum StepType {
    FileSource = 'FileSource',
    RenameFile = 'RenameFile',
    SetValue = 'SetValue',
    HarnessCLICommand = 'HarnessCLICommand',
    CreateApplication = 'CreateApplication',
    // RegexReplace = 'RegexReplace',
    // RunContainer = 'RunContainer',
    // JSONPatch = 'JSONPatch',
    // DeleteFile = 'DeleteFile',
    // RenderTemplate = 'RenderTemplate',
    // GraphQL = 'GraphQL',
    // ExecuteTemplate = 'ExecuteTemplate',
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

    abstract run(context: TemplateExecutionContext): Promise<void>

    renderTemplate(original: string | any, context: TemplateExecutionContext) {
        if (_.isString(original)) {
            const data = {
                vars: context.vars,
                outputs: context.outputs,
            }
            const rendered = _.template(original)(data)
            return rendered
        } 
        
        const recurse = this.renderTemplate
        if (_.isObject(original)) {
            traverse(original).forEach(function (x) {
                if (_.isString(x)) {
                    const rendered = recurse(x, context)
                    this.update(rendered)
                }
            })
        }
    
        return original
    }
}

export class FileSourceStep extends Step {
    type = StepType.FileSource

    source: StorageProviderRef
    exclude: string[];

    public constructor(name: string, source: StorageProviderRef, files: string[], exclude: string[]) {
        super(name, files)
        this.source = source
        this.exclude = exclude
    }

    public async run(context: TemplateExecutionContext): Promise<void> {
        this.renderTemplate(this.source.opts, context)
        const storageProvider = getStorageProvider(this.source, context)
        await storageProvider.init()
        let files: File[] = []
        for (const glob of this.files) {
            files = files.concat(await storageProvider.getFiles(glob))
        }

        files = files.filter(file => {
            for (const glob of this.exclude) {
                if (minimatch(file.path, glob)) {
                    return false
                }
            }
            return true
        })
        
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
            const templatedReplace = this.renderTemplate(this.replace, context)
            if (typeof templatedSearch === 'string') {
                templatedSearch = this.renderTemplate(templatedSearch, context)
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
        this.value = this.renderTemplate(this.value, context)
        for (const glob of this.files) {
            const templatedGlob = this.renderTemplate(glob, context)
            filesToProcess = filesToProcess.concat(context.workspace.filter(file => minimatch(file.path, templatedGlob)))
        }
        filesToProcess.forEach(file => {
            const obj = fromYaml(file.content)
            _.set(obj, this.path, this.value)
            file.content = toYaml(obj)
        })
        return Promise.resolve()
    }
}
