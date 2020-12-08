import * as git from 'isomorphic-git'
import * as fs from 'fs'
import { FileSystem } from './filesystem'
import * as http from 'isomorphic-git/http/node'
import { Config } from './config'

export interface GitOptions {
    repo: string;
    ref?: string;
    cwd?: string;
    auth?: {
        token?: string;
        username?: string;
        password?: string;
    };
    author?: {
        name: string;
        email: string;
    };
}

export class Git {
    repo: string;

    ref: string;

    cwd: string;

    auth: {
        token?: string;
        username?: string;
        password?: string;
    }

    author: {
        name: string;
        email: string;
    }

    protected fs = new FileSystem();

    constructor(opts: GitOptions) {
        this.repo = opts.repo
        this.ref = opts.ref || 'master'
        this.cwd = opts.cwd || this.fs.mktemp()

        if (opts.auth) {
            this.auth = opts.auth
        } else {
            this.auth = {
                username: Config.Git.username,
                password: Config.Git.password,
            }
        }
        this.author = opts.author || {
            name: 'Harness Automation',
            email: 'no-reply@harness.io',
        }
    }

    public async clone(): Promise<void> {
        await git.clone({
            fs,
            http,
            dir: this.cwd,
            url: this.repo,
            ref: this.ref,
            onAuth: () => {
                return { username: this.auth.username || this.auth.token || '', password: this.auth.password }
            },
        })
    }

    public async stageAll(): Promise<boolean> {
        let status = await git.statusMatrix({
            fs,
            dir: this.cwd,
        })

        const FILE = 0
        const HEAD = 1
        const WORKDIR = 2
        const STAGE = 3

        const filesToStage = status
            .filter(row => row[WORKDIR] !== row[STAGE])
            .map(row => {
                return {
                    path: row[FILE],
                    remove: row[WORKDIR] === 0,
                }
            })

        await Promise.all(filesToStage.map(async file => {
            await (file.remove ? git.remove({ fs, dir: this.cwd, filepath: file.path }) : git.add({ fs, dir: this.cwd, filepath: file.path }))
        }))

        status = await git.statusMatrix({
            fs,
            dir: this.cwd,
        })

        const unmodifiedFiles = status
            .filter(row => row[WORKDIR] === 1 && row[STAGE] === 1 && row[HEAD] === 1)

        if (unmodifiedFiles.length === status.length) {
            // no changes have been made.  Can skip commit & push
            return false
        }
        return true
    }

    public async commit(message: string): Promise<void> {
        await git.commit({
            fs,
            dir: this.cwd,
            message: message,
            author: this.author,

        })
    }

    public async push(): Promise<void> {
        await git.push({
            fs,
            http,
            dir: this.cwd,
            url: this.repo,
            onAuth: () => {
                return { username: this.auth.username || this.auth.token || '', password: this.auth.password }
            },
        })
    }

    public async pushAllChanges(message?: string): Promise<void> {
        const changesExist = await this.stageAll()
        if (changesExist) {
            await this.commit(message || 'Changes made by Harness Autmation Tool')
            await this.push()
        }
    }

    public async dispose(): Promise<void> {
        // console.log(`Removing directory ${this.cwd}`)
        await this.fs.rmdir(this.cwd)
    }
}
