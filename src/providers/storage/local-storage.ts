import { FileSystem, File } from '../../util/filesystem'
import path = require('path');
import { StorageProvider, StorageType } from './storage-provider'

export interface ConfigLocal {
    directory: string;
    mode?: number | string;
}

export class LocalStorageProvider implements StorageProvider {
    protected type = StorageType.Local;
    protected config: ConfigLocal;
    protected initialized = false;
    protected mode: number | string;
    protected fs = new FileSystem();

    constructor(config: ConfigLocal) {
        this.config = config
        this.config.mode = this.fs.parseFileMode(this.config.mode || 0o777)
        this.mode = this.config.mode
    }

    getType(): StorageType {
        return this.type
    }

    getConfig(): ConfigLocal {
        return this.config
    }

    async init(): Promise<boolean> {
        await this.fs.createDirectory(this.config.directory, this.mode)
        this.initialized = true
        return true
    }

    async test(): Promise<void> {
        if (this.initialized === false) {
            throw new Error('storage has not been initialized yet; call Storage.init() first')
        }

        try {
            await this.listFiles()
        } catch (e) {
            throw new Error(`Looks like the storage configuration is not correct (${e.message})`)
        }
    }

    async listFiles(pattern?: string | undefined): Promise<[string, number][]> {
        const files = await this.fs.glob(pattern || '*.*', this.config.directory)
        const result: [string, number][] = []
        for (let i = 0; i < files.length; i += 1) {
            const f = files[i]
            const stat = await this.fs.pathInfo(path.join(this.config.directory, f))
            result.push([f.replace(`${this.config.directory}/`, ''), stat.size])
        }
        return result
    }

    async fileExists(name: string): Promise<boolean> {
        return this.fs.fileExists(path.join(this.config.directory, name))
    }

    async getFile(name: string): Promise<File> {
        const files = await this.getFiles(name)
        if (files.length !== 1) {
            throw new Error(`Error loading file '${name}'`)
        }
        return files[0]
    }

    async getFiles(pattern: string): Promise<File[]> {
        const files = await this.fs.glob(pattern, this.config.directory)
        return this.fs.getFileContents(files, this.config.directory)
    }

    async storeFile(file: File): Promise<void> {
        return this.storeFiles([file])
    }

    async storeFiles(files: File[]): Promise<void> {
        return this.fs.saveFile(files, this.config.directory)
    }

    async deleteFile(name: string): Promise<void> {
        return this.deleteFiles(name)
    }

    async deleteFiles(pattern: string): Promise<void> {
        return this.fs.deleteFiles(pattern, this.config.directory)
    }
}
