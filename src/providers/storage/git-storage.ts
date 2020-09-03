import { File } from '../../util/filesystem'
import { LocalStorageProvider, ConfigLocal } from './local-storage'
import { GitOptions, Git } from '../../util/git'
import { StorageType } from './storage-provider'

export interface ConfigGit extends ConfigLocal, GitOptions {
}

export class GitStorageProvider extends LocalStorageProvider {
    protected type: StorageType;
    protected git: Git

    constructor(options: GitOptions) {
        const git = new Git(options)
        const config = options as unknown as ConfigLocal
        config.directory = git.cwd
        super(config)

        this.type = StorageType.Git
        this.git = git
    }

    async init(): Promise<boolean> {
        await this.git.clone()
        this.initialized = true
        return true
    }

    async storeFiles(files: File[]): Promise<void> {
        await super.storeFiles(files)
        await this.git.pushAllChanges()
    }

    async deleteFiles(pattern: string): Promise<void> {
        await super.deleteFiles(pattern)
        await this.git.pushAllChanges()
    }
}
