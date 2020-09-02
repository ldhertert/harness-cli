import * as git from 'isomorphic-git'
import * as path from 'path'
import * as fs from 'fs'
import { glob } from './filesystem'
import * as http from 'isomorphic-git/http/node'

interface Options {
    ref?: string;
    cwd?: string;
    auth: {
        token?: string;
        username?: string;
        password?: string;
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

    constructor(repo: string, opts: Options) {
        this.repo = repo
        this.ref = opts.ref || 'master'
        this.cwd = opts.cwd || path.join(process.cwd(), 'repo')
        this.auth = opts.auth
    }

    public async clone() {
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

    public async addAll(pattern?: string) {
        const files = await glob(pattern || '**/*.yaml', this.cwd)
        return Promise.all(files.map(async file => {
            await git.add({ fs, dir: this.cwd, filepath: file })
        }))
    }

    public async commit(message: string, author?: any) {
        await git.commit({
            fs,
            dir: this.cwd,
            message: message,
            author: author || {
                name: 'Harness Automation',
                email: 'no-reply@harness.io',
            },

        })
    }

    public async push() {
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
