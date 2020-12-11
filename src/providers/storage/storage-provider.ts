import { File } from '../../util/filesystem'
import { ConfigLocal } from './local-storage'
import { ConfigGit } from './git-storage'
import { HarnessApiOptions } from '../harness/harness-api-client'

export enum StorageType {
    Local = 'Local',
    Git = 'Git',
    Harness = 'Harness'
}

export interface StorageProviderRef {
    sourceType: StorageType
    opts?: ConfigLocal | ConfigGit | HarnessApiOptions
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

    dispose(): Promise<void>;
}
