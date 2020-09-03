import { StorageProviderRef, getStorageProvider } from '../storage/storage-provider'
import { TemplateExecutionContext } from './template'

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
        this.glob = glob
    }

    public async run(context: TemplateExecutionContext): Promise<void> {
        const storageProvider = getStorageProvider(this.source)
        await storageProvider.init()
        const files = await storageProvider.getFiles(this.glob || '**/*.*')
        
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
