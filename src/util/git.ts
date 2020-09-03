import * as git from 'isomorphic-git'
import * as path from 'path'
import * as fs from 'fs'
import { FileSystem } from './filesystem'
import * as http from 'isomorphic-git/http/node'

interface Options {
    ref?: string;
    cwd?: string;
    auth: {
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

    constructor(repo: string, opts: Options) {
        this.repo = repo
        this.ref = opts.ref || 'master'
        this.cwd = opts.cwd || path.join(process.cwd(), 'repo')
        this.auth = opts.auth
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

    public async addAll(pattern?: string): Promise<void> {
        const files = await this.fs.glob(pattern || '**/*.yaml', this.cwd)
        await Promise.all(files.map(async file => {
            await git.add({ fs, dir: this.cwd, filepath: file })
        }))
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
}
