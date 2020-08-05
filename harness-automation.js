const path = require('path');
const fs = require('fs');
const os = require('os');
const util = require('./util');
const yaml = require('js-yaml');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const HarnessTemplate = require ('./harnessTemplate');
const git = require('./git');
var args = require('minimist')(process.argv.slice(2));

require('dotenv').config();

(async () => {
    try {

        let config = {
            template: {
                repo: args["template-repo"] || process.env.TEMPLATE_REPO,
                branch: args["template-branch"] || process.env.TEMPLATE_BRANCH || "master",
                token: args["template-token"] || process.env.TEMPLATE_GITHUB_TOKEN,
            },
            target: {
                repo: args["target-repo"] || process.env.TARGET_REPO,
                branch: args["target-branch"] || process.env.TARGET_BRANCH || "master",
                token: args["target-token"] || process.env.TARGET_GITHUB_TOKEN,
            },
            vars: args["var"]
        };

        if (config.vars) {
            let vars = {}
            config.vars.forEach(v => {
                let split = v.split("=");
                vars[split[0]] = split[1];
            })
            config.vars = vars;
        }

        if (!config.vars && args["var-file"]) {
            config.vars = require(args["var-file"]);
        }

        if (args["help"] || !config.template.repo || !config.template.branch || !config.target.repo || !config.target.branch) {
            console.log(`Usage: harness-automation \n\
    --template-repo https://github.com/ldhertert/harness-automation.git \n\
    --template-repo-branch master \n\
    --template-repo-token your-github-token \n\
    --target-repo https://github.com/ldhertert/harness-automation.git \n\
    --target-repo-branch master \n\
    --target-repo-token your-github-token \n\
    --var templateVar1="someValue" \n\
    --var templateVar2="another value" \n\
    --var-file vars.json
            `)
            process.exit(0);
        }

        let template = await HarnessTemplate.load(config.template.repo, config.template.branch, config.template.token)
        template.transform(config.vars);

        let target = await util.createWorkspace();

        console.log(`Cloning ${config.target.repo} (${config.target.branch}) to ${target}`)
        await git.clone(config.target.repo, config.target.branch, config.target.token, target)

        console.log('Applying template changes to target repo');
        await template.copyTo(target);

        console.log('Pushing changes to target repo');
        await git.addAll(target);
        await git.commit('Importing from template', target);
        await git.push(config.target.repo, config.target.token, target);
        
        await fs.promises.rmdir(target, { recursive: true })

    } catch (e) {
        console.error(e);
    }
})();