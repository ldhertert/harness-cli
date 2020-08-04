const globSync = require('glob');
const fs = require('fs')
const path = require('path')
const os = require('os');


module.exports.glob = function glob(pattern, path, options) {
    return new Promise((resolve, reject) => {
        options = options || {}
        options.cwd = path
        globSync(pattern, options, function (err, files) {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        })
    })
}

module.exports.createWorkspace = async function() {
    let workdir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'harness-automation'))
     return workdir
}

String.prototype.interpolate = function(params) {
  const names = Object.keys(params);
  const vals = Object.values(params);
  return new Function(...names, `return \`${this}\`;`)(...vals);
};