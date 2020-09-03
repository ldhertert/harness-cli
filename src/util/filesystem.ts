import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import * as globSync from 'glob'

export interface File {
    path: string;
    content: string;
}

export class FileSystem {
    async glob(pattern: string, cwd: string): Promise<string[]> {
        return new Promise((resolve, reject) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const options: any = { cwd: cwd }
            globSync(pattern, options, function (err, files) {
                if (err) {
                    reject(err)
                } else {
                    resolve(files)
                }
            })
        })
    }

    mktemp(): string {
        return fs.mkdtempSync(path.join(os.tmpdir(), 'harness'))
    }

    async createDirectory(path: string, mode: string | number): Promise<void> {
        try {
            await fs.promises.access(path)
        } catch {
            await fs.promises
                .mkdir(path, {
                    recursive: true,
                    mode: mode,
                })
                .catch(e => {
                    throw e
                })
        }
    }

    async rmdir(path: string): Promise<void> {
        return fs.promises.rmdir(path, { recursive: true })
    }

    async getFileContents(source: string[] | string, cwd?: string): Promise<File[]> {
        const filePaths = Array.isArray(source) ? source : [source]

        return Promise.all(filePaths.map(async p => {
            const content = await fs.promises.readFile(path.join(cwd || '', p), { encoding: 'utf-8' })
            return { path: p, content: content }
        }))
    }

    async saveFile(files: File[] | File, cwd?: string): Promise<void> {
        if (!Array.isArray(files)) {
            files = [files]
        }

        await Promise.all(files.map(async file => {
            return fs.promises.writeFile(path.join(cwd || '', file.path), file.content, { encoding: 'utf-8' })
        }))
    }

    async deleteFiles(files: File[] | File | string, cwd?: string): Promise<void> {
        if (typeof files === 'string') {
            const matches = await this.glob(files, cwd || '')
            files = matches.map(file => {
                return { path: file, content: '' }
            })
        } else if (!Array.isArray(files)) {
            files = [files]
        }

        await Promise.all(files.map(async file => {
            return fs.promises.unlink(path.join(cwd || '', file.path))
                .catch(err => {
                    // don't throw an error if the file has already been removed (or didn't exist at all)
                    if (err.message.includes('no such file or directory')) {
                        throw new Error(err.message)
                    }
                })
        }))
    }

    async fileExists(path: string): Promise<boolean> {
        try {
            await fs.promises.access(path)
            return true
        } catch {
            return false
        }
    }

    async pathInfo(path: string): Promise<fs.Stats> {
        const stat = await fs.promises.stat(path)
        return stat
    }

    parseFileMode = (s: number | string): number | string => {
        if (typeof s === 'number') {
            if (s < 0) {
                throw new Error(
                    `The argument 'mode' must be a 32-bit unsigned integer or an octal string. Received ${s}`,
                )
            }
            return s
        }
        if (s.startsWith('0o')) {
            return s.substring(2)
        }
        return s
    }
}
