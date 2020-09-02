import * as git from 'isomorphic-git'
import * as path from 'path'
import * as fs from 'fs'
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

//   module.exports.addAll = async function addAll(dir, glob) {
//     let files = await util.glob(glob || "**/*.yaml", dir);
//     for (const filepath of files) {
//         await git.add({ fs, dir, filepath })
//     }
// }

// module.exports.commit = async function commit(message, directory, author) {
//     await git.commit({ 
//         fs, 
//         dir: directory, 
//         message: message,
//         author: author || {
//             name: 'Harness Automation',
//             email: 'no-reply@harness.io',
//           },
       
//     });
// }

// module.exports.push = async function push(repo, token, directory) {
//     await git.push({ 
//         fs, 
//         http, 
//         dir: directory, 
//         url: repo,
//         onAuth: url => {
//             return { username: token, password: "" }
//         }
//     });
// }
}
