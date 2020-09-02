import * as path from 'path'
import * as fs from 'fs'
import * as os from 'os'
import * as globSync from 'glob'

export interface File {
    path: string;
    content: string;
}

export function glob(pattern: string, cwd: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
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

export async function mktemp() {
    const workdir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'harness'))
    return workdir
}

export async function rmdir(path: string) {
    return fs.promises.rmdir(path, { recursive: true })
}

export async function getFileContents(source: string[] | string, cwd?: string): Promise<File[]> {
    const filePaths = Array.isArray(source) ? source : [source]

    return Promise.all(filePaths.map(async p => {
        const content = await fs.promises.readFile(path.join(cwd || '', p), { encoding: 'utf-8' })
        return { path: p, content: content }
    }))
}

export async function saveFile(files: File[] | File, cwd?: string): Promise<void> {
    if (!Array.isArray(files)) {
        files = [files]
    }

    await Promise.all(files.map(async file => {
        return fs.promises.writeFile(path.join(cwd || '', file.path), file.content, { encoding: 'utf-8' })
    }))
}
