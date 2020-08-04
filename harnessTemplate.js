const git = require('./git');
const fs = require('fs');
const path = require('path');
const os = require('os');
const yaml = require('js-yaml');
const minimatch = require('minimatch');
const util = require('./util');
const { match } = require('assert');
const _ = require("lodash");
const mkdirp = require('mkdirp');

module.exports.load = async function load(repository, branch, token, manifestPath) {
    try { 
        branch = branch || 'master';
        manifestPath = manifestPath || 'template.yaml';

        let workdir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'harness-automation'))
        await fs.promises.mkdtemp(workdir);
        
        console.log(`Cloning ${repository} (${branch}) to ${workdir}`)
        await git.clone(repository, branch, token, workdir);

        console.log (`Loading manifest from ${path.join(workdir, manifestPath)}.`)
        let manifest = await loadManifest(workdir, manifestPath);
        let fileContents = [];
        for(const fileSource of manifest.files) {
            let sourceFiles = await util.glob(`${fileSource.path}/**/*.yaml`,workdir);
            for (const file of sourceFiles) {
                let content = await fs.promises.readFile(path.join(workdir, file), 'utf-8');
                fileContents.push({ path: file, content: content })
            }
        }

        await fs.promises.rmdir(workdir, { recursive: true });

        let templateObj = {
            manifest: manifest,
            files: fileContents,
        };
        templateObj.transform = (vars) => this.transform(templateObj, vars);
        templateObj.copyTo = (baseDirectory) => this.copyTo(templateObj, baseDirectory);
        return templateObj;

    } catch (e) {
        console.error(`Error loading template from ${repository} (${branch})`);
        throw e;
    }
}

module.exports.transform = function transform(template, vars) {
    vars = vars || {}

    for (const transform of template.manifest.transforms) {
        let matches = template.files.filter(f => minimatch(f.path, transform.file));
        matches.forEach(file => {
            if (transform.kind.toLowerCase() === "setvalue") {
                SetPropertyTransform(file, transform, vars);
            } else if (transform.kind.toLowerCase() === "modifyfilepath") {
                let newpath = transform.new.interpolate(vars);
                //console.log(`Changing file path from ${transform.old} to ${newpath}`)
                file.path = file.path.replace(transform.old, newpath);
            }
        })
    }
}

module.exports.copyTo = async function(template, baseDirectory) {
    for (const file of template.files) {
        let dest = path.join(baseDirectory, file.path)
        await mkdirp(path.dirname(dest))
        await fs.promises.writeFile(dest, file.content)
    }
}

async function loadManifest(workdir, manifestPath) {
    try {
        let manifest = await fs.promises.readFile(path.join(workdir, manifestPath), 'utf8')
        return manifest = yaml.safeLoad(manifest);
    } catch (e) {
        throw new Error(`Error loading manifest from ${path.join(workdir, manifestPath)}.  ${e}`)
    }
}

function SetPropertyTransform(file, transform, vars) {
    //console.log(`Updating property ${transform.property} in ${file.path}`)
    let jsonContent = yaml.safeLoad(file.content);
    _.set(jsonContent, transform.property, transform.value.interpolate(vars));
    file.content = yaml.safeDump(jsonContent)
}

