import * as YAML from 'js-yaml'
import { StorageProviderRef, StorageProvider, StorageType } from '../providers/storage/storage-provider'
import { LocalStorageProvider, ConfigLocal } from '../providers/storage/local-storage'
import { GitStorageProvider, ConfigGit } from '../providers/storage/git-storage'
import { HarnessStorageProvider } from '../providers/storage/harness-api-storage'
import { HarnessApiOptions } from '../providers/harness/harness-api-client'

export function fromYaml(yaml: string): any {
    return YAML.safeLoad(yaml)
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function toYaml(obj: any): string {
    return YAML.safeDump(obj)
}

export function getStorageProvider(ref: StorageProviderRef): StorageProvider {
    if (ref.sourceType.toLowerCase() === StorageType.Local.toLowerCase()) {
        return new LocalStorageProvider(ref.opts as ConfigLocal)
    }

    if (ref.sourceType.toLowerCase() === StorageType.Git.toLowerCase()) {
        return new GitStorageProvider(ref.opts as ConfigGit)
    }

    if (ref.sourceType.toLowerCase() === StorageType.Harness.toLowerCase()) {
        return new HarnessStorageProvider(ref.opts as HarnessApiOptions)
    }

    throw new Error('Unsupported storage provider.')
}
