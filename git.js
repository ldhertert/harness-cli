const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');
const fs = require('fs');
const util = require('./util');

module.exports.clone = async function clone(repo, branch, token, directory) {
    await git.clone({ 
        fs, 
        http, 
        singleBranch: branch, 
        dir: directory, 
        url: repo,
        onAuth: url => {
            return { username: token, password: "" }
        }
    });
}

module.exports.addAll = async function addAll(dir, glob) {
    let files = await util.glob(glob || "**/*.yaml", dir);
    for (const filepath of files) {
        await git.add({ fs, dir, filepath })
    }
}

module.exports.commit = async function commit(message, directory, author) {
    await git.commit({ 
        fs, 
        dir: directory, 
        message: message,
        author: author || {
            name: 'Harness Automation',
            email: 'no-reply@harness.io',
          },
       
    });
}

module.exports.push = async function push(repo, token, directory) {
    await git.push({ 
        fs, 
        http, 
        dir: directory, 
        url: repo,
        onAuth: url => {
            return { username: token, password: "" }
        }
    });
}