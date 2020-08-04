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

Sample Template manifest
------------------------

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