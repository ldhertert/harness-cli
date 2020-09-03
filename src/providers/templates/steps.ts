import { StorageProviderRef, getStorageProvider } from '../storage/storage-provider'

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

    abstract async run(): Promise<void>
}

export class FileSourceStep extends Step {
    type = StepType.FileSource

    source: StorageProviderRef

    public constructor(name: string, source: StorageProviderRef, glob?: string) {
        super(name)
        this.source = source
        this.glob = glob
    }

    public async run(): Promise<void> {
        const storageProvider = getStorageProvider(this.source)
        await storageProvider.init()
        const files = await storageProvider.getFiles(this.glob || '**/*.*')
        console.log(JSON.stringify(files, undefined, 4))
    }
}
