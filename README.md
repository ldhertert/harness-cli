Goals
-----

* Provide a simple mechanism for customers to automate the onboarding of new application teams within the current Harness platform (CDNG will address the majority of the challenges that this project is meant to address)
* Allow sharing of best practice templates amongst teams across Harness applications
* Enable self service onboarding by application teams by leveraging templates provided by Harness COE
* Leverage existing resources defined in Harness (i.e. config as code definitions, GraqpQL representations) as sources.  This enables the utiltiy to be as "future proof" as possible in the scenario where schemas/capabilities change over time.

Usage
-----

```
harness-automation 
    --template-repo https://github.com/ldhertert/harness-automation.git 
    --template-repo-branch master 
    --template-repo-token your-github-token 
    --target-repo https://github.com/ldhertert/harness-automation.git 
    --target-repo-branch master 
    --target-repo-token your-github-token 
    --var templateVar1="someValue" 
    --var templateVar2="another value" 
    --var-file vars.json
```

The following environment variables are also supported.
```
TEMPLATE_GITHUB_TOKEN
TARGET_GITHUB_TOKEN
TEMPLATE_REPO
TEMPLATE_BRANCH
TARGET_REPO
TARGET_BRANCH
```

MVP Requirements
----------------

- [x] Packaged binary that can be easily run across multiple platforms
- [x] Allow definition of a template (template manifest, name, version, description, input variables, source files, transformations, destination, etc)
- [x] Pull source yaml files from existing Harness config as code 
- [x] Transform yaml files based on user input as needed to customize new instance of template
- [x] Push transformed yaml files to target Harness config as code repo
- [ ] Leverage new API endpoints for config as code instead of git sync (waiting on Harness engineering to deliver)
- [ ] Leverage Harness API for common onboarding tasks (secret creation, user/group provisioning, etc)
- [ ] Investigate logistical concerns (support model, open/closed source, license, security scanning, etc)
- [ ] Documentation
- [ ] Automated CI/CD pipeline

Planned improvements
--------------------

* Move repo into harness org
* Support embedding files directly into template manifest
* Better error handling/CLI UX
* In-memory filesystem for git operations
* Support additional sources for templates (i.e. url, s3, etc)
* Child templates (reference another template from within a template)
* Additional transformation types (i.e. true template rendering engines)
* Make template inputs/variables be Harness aware (i.e. if user provides secret name, we can look up the secret id via api)
* Interactive CLI - prompt for template inputs
* Chrome extension - browse available templates, choose template inputs interactively (i.e. application selector)
* Conditional logic - allow users to conditionally include things like verification, support multiple artifact server types, etc
* Additional harness admin tasks - graphql api items
* Bulk management tasks - perform tasks across all applications within account
* Automated testing

Sample Template manifest
------------------------

```
name: My Awesome template
version: 1.0
description: ''
vars:
  - name: applicationName
    description: An existing Harness application name
  - name: serviceName
    description: The name of the service
  - name: artifactSource
    description: The Artifact Server connector name
  - name: imageName
    description: The docker image name
files:
  - repository: https://github.com/ldhertert/luke-testing-harness
    branch: master
    path: Setup/Applications/Harness Sample App/Services/To-Do List K8s/
transforms:
  - file: Setup/Applications/Harness Sample App/Services/To-Do List K8s/Manifests/Files/values.yaml
    property: name
    value: "${serviceName}"
    kind: SetValue
  - file: Setup/Applications/Harness Sample App/Services/To-Do List K8s/Artifact Servers/harness_todolist.yaml
    property: imageName
    value: "${imageName}"
    kind: SetValue
  - file: Setup/Applications/Harness Sample App/Services/To-Do List K8s/Artifact Servers/harness_todolist.yaml
    property: serverName
    value: "${artifactSource}"
    kind: SetValue
  - file: "**/*"
    kind: ModifyFilePath
    old: Setup/Applications/Harness Sample App/Services/To-Do List K8s/
    new: "Setup/Applications/${applicationName}/Services/${serviceName}/"
 ```
