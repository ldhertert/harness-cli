import { File } from '../../util/filesystem'
import { LocalStorageProvider, ConfigLocal } from './local-storage'
import { GitStorageProvider, ConfigGit } from './git-storage'

export enum StorageType {
    Local = 'Local',
    Git = 'Git'
}

export interface StorageProviderRef {
    sourceType: StorageType
    opts: unknown
}

export interface StorageProvider {
    getType(): StorageType;
    getConfig(): unknown;
    init(): Promise<boolean>;
    test(): Promise<void>;

    listFiles(pattern?: string): Promise<[string, number][]>;
    fileExists(name: string): Promise<boolean>;

    getFile(names: string): Promise<File>;
    getFiles(pattern: string): Promise<File[]>;

    storeFile(file: File): Promise<void>;
    storeFiles(files: File[]): Promise<void>;

    deleteFile(name: string): Promise<void>;
    deleteFiles(pattern: string): Promise<void>;
}

export function getStorageProvider(ref: StorageProviderRef): StorageProvider {
    if (ref.sourceType.toLowerCase() === StorageType.Local.toLowerCase()) {
        return new LocalStorageProvider(ref.opts as ConfigLocal)
    }

    if (ref.sourceType.toLowerCase() === StorageType.Git.toLowerCase()) {
        return new GitStorageProvider(ref.opts as ConfigGit)
    }

    throw new Error('Unsupported storage provider.')
}
