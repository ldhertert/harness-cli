harness-cli
===========

[![Version](https://img.shields.io/npm/v/@ldhertert/harness-cli.svg)](https://npmjs.org/package/@ldhertert/harness-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@ldhertert/harness-cli.svg)](https://npmjs.org/package/@ldhertert/harness-cli)
[![License](https://img.shields.io/npm/l/@ldhertert/harness-cli.svg)](https://github.com/ldhertert/harness-cli/blob/master/package.json)
[![Slack](https://img.shields.io/badge/slack-@harness/community-yellow.svg?logo=slack)](https://harnesscommunity.slack.com/archives/C01ETG99YHJ)

* [Overview](#overview)
* [Disclaimers](#disclaimers)
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
*  Additional Documentation
    * [Template syntax and capabilities](docs/Templates.md)

Overview
========

This tool has been designed to simplify common automation tasks for administration of the Harness platform.  The primary focus initially is
on streamlining common app team onboarding tasks, such as creating applications, user groups, and bootstrapping default pipeline resources.  These tasks leverage the Harness GraphQL API as well as Harness Config as Code. There are also commands for interacting with common platforms that Harness customers interact with in tandem with Harness, such as Github and Kubernetes.

Disclaimers
===========

* This product is not supported by the Harness Customer Support team.  If you have any problems or questions please open a [new issue](https://github.com/ldhertert/harness-cli/issues/new) or join our [slack channel](https://harnesscommunity.slack.com/archives/C01ETG99YHJ)
* This is definitely a work in progress.  Not all API's have been implemented as CLI commands, and for the ones that have been, some functionality/permutations have not yet been implemented.  If there is something missing that you need, please open a [new issue](https://github.com/ldhertert/harness-cli/issues/new), join our [slack channel](https://harnesscommunity.slack.com/archives/C01ETG99YHJ).

Installation
============

There are two options for installation.  

1) There are standalone binaries available for linux, macos, and windows on the [releases page](https://github.com/ldhertert/harness-cli/releases). 
2) [NPM package](https://npmjs.org/package/@ldhertert/harness-cli).  Note: NodeJS v12 or required.
    ```
    npm install -g @ldhertert/harness-cli
    ```

# Usage

Examples of command usage can be found [here](test/allCommands.sh)

```sh-session
$ export HARNESS_ACCOUNT='xxxxxx'
$ export HARNESS_API_KEY='xxxxxx'
$ harness applications:list
running command...
$ harness (-v|--version|version)
$ harness --help [COMMAND]
```

## Global options

The following options are available across all commands, but for brevity have been exclused from the individual command documentation. 

```
OPTIONS
  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable.  If a path is included, then that path is used as the API root.  Otherwise, the default API root will be /gateway/api.

  -s, --silent                         Supress stdout logging. Can also be set via
                                       HARNESS_CLI_SILENT environment variable

  --debug                              Print debug logs to stdout. Can also be set via
                                       HARNESS_CLI_DEBUG environment variable

  --help                               Display help for a command                                      
```


# Commands
<!-- commands -->
* [`harness application:create`](#harness-applicationcreate)
* [`harness application:delete`](#harness-applicationdelete)
* [`harness application:get`](#harness-applicationget)
* [`harness application:list`](#harness-applicationlist)
* [`harness application:update`](#harness-applicationupdate)
* [`harness autocomplete [SHELL]`](#harness-autocomplete-shell)
* [`harness cloud-provider:create-k8s`](#harness-cloud-providercreate-k8s)
* [`harness cloud-provider:delete`](#harness-cloud-providerdelete)
* [`harness cloud-provider:get`](#harness-cloud-providerget)
* [`harness config-as-code:delete`](#harness-config-as-codedelete)
* [`harness config-as-code:get`](#harness-config-as-codeget)
* [`harness config-as-code:list-files`](#harness-config-as-codelist-files)
* [`harness config-as-code:upsert`](#harness-config-as-codeupsert)
* [`harness connectors:create-docker`](#harness-connectorscreate-docker)
* [`harness connectors:create-git`](#harness-connectorscreate-git)
* [`harness connectors:delete`](#harness-connectorsdelete)
* [`harness github:create-repo`](#harness-githubcreate-repo)
* [`harness github:create-webhook`](#harness-githubcreate-webhook)
* [`harness github:delete-repo`](#harness-githubdelete-repo)
* [`harness groups:create`](#harness-groupscreate)
* [`harness groups:delete`](#harness-groupsdelete)
* [`harness groups:get`](#harness-groupsget)
* [`harness groups:list`](#harness-groupslist)
* [`harness help [COMMAND]`](#harness-help-command)
* [`harness k8s:cluster-info`](#harness-k8scluster-info)
* [`harness k8s:create-namespace`](#harness-k8screate-namespace)
* [`harness k8s:create-role`](#harness-k8screate-role)
* [`harness k8s:create-service-account`](#harness-k8screate-service-account)
* [`harness k8s:get-service-account`](#harness-k8sget-service-account)
* [`harness secrets:create`](#harness-secretscreate)
* [`harness secrets:delete`](#harness-secretsdelete)
* [`harness secrets:get`](#harness-secretsget)
* [`harness secrets:update`](#harness-secretsupdate)
* [`harness template:exec`](#harness-templateexec)
* [`harness users:create`](#harness-userscreate)
* [`harness users:delete`](#harness-usersdelete)
* [`harness users:get`](#harness-usersget)
* [`harness users:list`](#harness-userslist)

## `harness application:create`

Create a new Harness application

```
USAGE
  $ harness application:create

OPTIONS
  -n, --name=name              (required) The name of the application
  --branch=branch              The branch name to use for git sync. Defaults to "master" if sync is enabled.
  --description=description    A description of the application
  --gitConnector=gitConnector  The name or id of the git connector to use for git sync.
  --skipExisting               If true, this command will not fail if an resource with the same name already exists.
  --syncEnabled                Whether or not git sync should be enabled

ALIASES
  $ harness app:create
  $ harness apps:create
  $ harness applications:create
  $ harness application:create
```

_See code: [src/commands/application/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/application/create.ts)_

## `harness application:delete`

Delete an application

```
USAGE
  $ harness application:delete

OPTIONS
  -n, --nameOrId=nameOrId  (required) The name or id of the application

ALIASES
  $ harness app:delete
  $ harness apps:delete
  $ harness applications:delete
  $ harness application:delete
```

_See code: [src/commands/application/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/application/delete.ts)_

## `harness application:get`

Get an application

```
USAGE
  $ harness application:get

OPTIONS
  -n, --nameOrId=nameOrId  (required) The name or id of the application

ALIASES
  $ harness app:get
  $ harness apps:get
  $ harness applications:get
  $ harness application:get
```

_See code: [src/commands/application/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/application/get.ts)_

## `harness application:list`

List Applications

```
USAGE
  $ harness application:list

ALIASES
  $ harness app:list
  $ harness apps:list
  $ harness applications:list
  $ harness application:list
```

_See code: [src/commands/application/list.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/application/list.ts)_

## `harness application:update`

Update an application

```
USAGE
  $ harness application:update

OPTIONS
  -n, --nameOrId=nameOrId      (required) The current name or id of the application
  --branch=branch              The branch name to use for git sync
  --description=description    The new description of the application. If omitted, the value will remain unchanged.
  --gitConnector=gitConnector  The name or id of the git connector to use for git sync
  --newName=newName            The new name of the application.  If omitted, the value will remain unchanged.
  --syncEnabled                Whether or not git sync should be enabled. If omitted, the value will remain unchanged.

ALIASES
  $ harness app:update
  $ harness apps:update
  $ harness applications:update
  $ harness application:update
```

_See code: [src/commands/application/update.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/application/update.ts)_

## `harness autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ harness autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ harness autocomplete
  $ harness autocomplete bash
  $ harness autocomplete zsh
  $ harness autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.1/src/commands/autocomplete/index.ts)_

## `harness cloud-provider:create-k8s`

Create a new application

```
USAGE
  $ harness cloud-provider:create-k8s

OPTIONS
  -n, --name=name                                        (required) The name of the cloud provider

  --harnessPassword=harnessPassword                      The Harness password. This is currently required if you inherit
                                                         from delegate (See
                                                         https://github.com/ldhertert/harness-cli/issues/6).  Can also
                                                         be set via HARNESS_PASSWORD environment variable.

  --harnessUsername=harnessUsername                      The Harness username. This is currently required if you inherit
                                                         from delegate (See
                                                         https://github.com/ldhertert/harness-cli/issues/6).  Can also
                                                         be set via HARNESS_USERNAME environment variable.

  --inheritFromDelegate=inheritFromDelegate              If true, permissions are inherited from the delegate instead of
                                                         being explicitly provided

  --masterUrl=masterUrl                                  The Kubernetes master node URL. The easiest method to obtain
                                                         the master URL is using kubectl: kubectl cluster-info

  --serviceAccountTokenSecret=serviceAccountTokenSecret  The name or id of the secret that contains the service account
                                                         token

  --skipExisting                                         If true, this command will not fail if an resource with the
                                                         same name already exists.

  --skipValidation

ALIASES
  $ harness cloud-provider:create-k8s
  $ harness cloud-providers:create-k8s
```

_See code: [src/commands/cloud-provider/create-k8s.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/cloud-provider/create-k8s.ts)_

## `harness cloud-provider:delete`

Delete cloud provider

```
USAGE
  $ harness cloud-provider:delete

OPTIONS
  -n, --nameOrId=nameOrId  (required) The name or id of the cloud provider

ALIASES
  $ harness cloud-provider:delete
  $ harness cloud-providers:delete
```

_See code: [src/commands/cloud-provider/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/cloud-provider/delete.ts)_

## `harness cloud-provider:get`

Get cloud provider

```
USAGE
  $ harness cloud-provider:get

OPTIONS
  -n, --nameOrId=nameOrId  (required) The name or id of the cloud provider

ALIASES
  $ harness cloud-provider:get
  $ harness cloud-providers:get
```

_See code: [src/commands/cloud-provider/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/cloud-provider/get.ts)_

## `harness config-as-code:delete`

Delete a config as code file at the given path

```
USAGE
  $ harness config-as-code:delete

OPTIONS
  --harnessPassword=harnessPassword  [DEPRECATED] The Harness password. Can also be set via HARNESS_PASSWORD environment
                                     variable.

  --harnessUsername=harnessUsername  [DEPRECATED] The Harness username. Can also be set via HARNESS_USERNAME environment
                                     variable.

  --path=path                        (required) The file path to delete.  Glob patterns are supported.

ALIASES
  $ harness config:delete
  $ harness config-as-code:delete
```

_See code: [src/commands/config-as-code/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/config-as-code/delete.ts)_

## `harness config-as-code:get`

Fetch file contents based on path

```
USAGE
  $ harness config-as-code:get

OPTIONS
  --harnessPassword=harnessPassword  (required) The Harness password. This is required for now until the underlying APIs
                                     suport API key auth.  Can also be set via HARNESS_PASSWORD environment variable.

  --harnessUsername=harnessUsername  (required) The Harness username. This is required for now until the underlying APIs
                                     suport API key auth.  Can also be set via HARNESS_USERNAME environment variable.

  --out=out                          A directory path on the local filesystem that will be used to write file contents
                                     to disk.

  --path=path                        (required) The file path(s) to fetch contents for. Glob patterns are supported.

  --raw                              Output raw YAML content instead of a JSON array.  This is only supported when there
                                     is a single file matching the provided path.

ALIASES
  $ harness config:get
  $ harness config-as-code:get
```

_See code: [src/commands/config-as-code/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/config-as-code/get.ts)_

## `harness config-as-code:list-files`

List file tree for config-as-code

```
USAGE
  $ harness config-as-code:list-files

OPTIONS
  --harnessPassword=harnessPassword  [DEPRECATED] The Harness password. Can also be set via HARNESS_PASSWORD environment
                                     variable.

  --harnessUsername=harnessUsername  [DEPRECATED] The Harness username. Can also be set via HARNESS_USERNAME environment
                                     variable.

ALIASES
  $ harness config:list
  $ harness config-as-code:list-files
```

_See code: [src/commands/config-as-code/list-files.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/config-as-code/list-files.ts)_

## `harness config-as-code:upsert`

Create or update a config as code file at the given path

```
USAGE
  $ harness config-as-code:upsert

OPTIONS
  --content=content                  The YAML content

  --harnessPassword=harnessPassword  [DEPRECATED] The Harness password. Can also be set via HARNESS_PASSWORD environment
                                     variable.

  --harnessUsername=harnessUsername  [DEPRECATED] The Harness username. Can also be set via HARNESS_USERNAME environment
                                     variable.

  --path=path                        The file path

  --source=source                    The path to a directory on the local filesystem that contains files to be upserted.
                                     Source files must contain a valid Harness config as code path structure relative to
                                     the source directory.

  --sourcePattern=sourcePattern      [default: **/*.yaml] A glob pattern to limit files to include from source directory

ALIASES
  $ harness config:upsert
  $ harness config-as-code:upsert
  $ harness config:create
  $ harness config-as-code:create
  $ harness config:update
  $ harness config-as-code:update
```

_See code: [src/commands/config-as-code/upsert.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/config-as-code/upsert.ts)_

## `harness connectors:create-docker`

Create docker connector

```
USAGE
  $ harness connectors:create-docker

OPTIONS
  -n, --name=name                  (required) The name of the connector

  --passwordSecret=passwordSecret  The name or id of the secret that contains the password to be used for docker
                                   authentication

  --skipExisting                   If true, this command will not fail if an resource with the same name already exists.

  --url=url                        (required) [default: https://index.docker.io/v2/] The url for the docker registry

  --username=username              The username to be used for authentication

ALIASES
  $ harness connector:create-docker
  $ harness connectors:create-docker
```

_See code: [src/commands/connectors/create-docker.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/connectors/create-docker.ts)_

## `harness connectors:create-git`

Create git connector

```
USAGE
  $ harness connectors:create-git

OPTIONS
  -n, --name=name                  (required) The name of the connector
  --branch=branch                  [default: master] The git branch name

  --passwordSecret=passwordSecret  (required) The name or id of the secret that contains the password to be used for git
                                   authentication

  --url=url                        (required) The url for the repository

  --username=username              (required) The username to be used for git authentication

ALIASES
  $ harness connector:create-git
  $ harness connectors:create-git
```

_See code: [src/commands/connectors/create-git.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/connectors/create-git.ts)_

## `harness connectors:delete`

Delete connector

```
USAGE
  $ harness connectors:delete

OPTIONS
  -n, --name=name                        The name of the connector
  --id=id                                The id of the connector
  --type=(DockerConnector|GitConnector)  (required)

ALIASES
  $ harness connector:delete
  $ harness connectors:delete
```

_See code: [src/commands/connectors/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/connectors/delete.ts)_

## `harness github:create-repo`

Create a new GitHub Repository in an Organization

```
USAGE
  $ harness github:create-repo

OPTIONS
  --baseUrl=baseUrl                       [default: https://api.github.com] The Github API base url
  --description=description               A description of the application
  --org=org                               (required) The Github organization
  --repo=repo                             (required) The repository name

  --token=token                           (required) The GitHub token for authentication.  This can also be set via the
                                          environment variable GITHUB_TOKEN.

  --visibility=(private|public|internal)  [default: private] Visibility settings for the repository
```

_See code: [src/commands/github/create-repo.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/github/create-repo.ts)_

## `harness github:create-webhook`

Create a new webhook in a GitHub repo for a Harness git connector

```
USAGE
  $ harness github:create-webhook

OPTIONS
  --baseUrl=baseUrl            [default: https://api.github.com] The Github API base url
  --gitConnector=gitConnector  (required) The name or id of the Harness git connector
  --org=org                    (required) The Github organization
  --repo=repo                  (required) The repository name

  --token=token                (required) The GitHub token for authentication.  This can also be set via the environment
                               variable GITHUB_TOKEN.
```

_See code: [src/commands/github/create-webhook.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/github/create-webhook.ts)_

## `harness github:delete-repo`

Delete a GitHub Repository in an Organization

```
USAGE
  $ harness github:delete-repo

OPTIONS
  --baseUrl=baseUrl  [default: https://api.github.com] The Github API base url
  --org=org          (required) The Github organization
  --repo=repo        (required) The repository name

  --token=token      (required) The GitHub token for authentication.  This can also be set via the environment variable
                     GITHUB_TOKEN.
```

_See code: [src/commands/github/delete-repo.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/github/delete-repo.ts)_

## `harness groups:create`

Create a new user group. Note - not all functionality has been implemented yet

```
USAGE
  $ harness groups:create

OPTIONS
  -n, --name=name                          (required) The name of the group

  --applicationScope=applicationScope      An application id or name.  This will replace any Application Restrictions
                                           with the provided applications.  Multiple values are allowed

  --copyPermissionFrom=copyPermissionFrom  Copy permissions from an existing group.

  --permissions=permissions                JSON encoded permissions object

ALIASES
  $ harness group:create
  $ harness groups:create
```

_See code: [src/commands/groups/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/groups/create.ts)_

## `harness groups:delete`

Delete user group

```
USAGE
  $ harness groups:delete

OPTIONS
  -n, --name=name  The name of the group
  --id=id          The id of the group

ALIASES
  $ harness group:delete
  $ harness groups:delete
```

_See code: [src/commands/groups/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/groups/delete.ts)_

## `harness groups:get`

Get user group

```
USAGE
  $ harness groups:get

OPTIONS
  -n, --name=name  The name of the group
  --id=id          The id of the group

ALIASES
  $ harness group:get
  $ harness groups:get
```

_See code: [src/commands/groups/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/groups/get.ts)_

## `harness groups:list`

List User groups

```
USAGE
  $ harness groups:list

ALIASES
  $ harness group:list
  $ harness groups:list
```

_See code: [src/commands/groups/list.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/groups/list.ts)_

## `harness help [COMMAND]`

display help for harness

```
USAGE
  $ harness help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `harness k8s:cluster-info`

Get a kubernetes service account

```
USAGE
  $ harness k8s:cluster-info

OPTIONS
  --kubeconfig=kubeconfig  Path to a kubeconfig file. If not specified, the following search order takes precedence:
                           KUBECONFIG environment variable, default kubectl config file (i.e. ~/.kube/config).

  --name=name              [default: harness] The name of the service account
```

_See code: [src/commands/k8s/cluster-info.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/k8s/cluster-info.ts)_

## `harness k8s:create-namespace`

Create a new Kubernetes namespace

```
USAGE
  $ harness k8s:create-namespace

OPTIONS
  --kubeconfig=kubeconfig  Path to a kubeconfig file. If not specified, the following search order takes precedence:
                           KUBECONFIG environment variable, default kubectl config file (i.e. ~/.kube/config).

  --name=name              (required) The name of the new namespace
```

_See code: [src/commands/k8s/create-namespace.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/k8s/create-namespace.ts)_

## `harness k8s:create-role`

Create a Kubernetes Role with common Harness permissions and optionally bind to a service account.

```
USAGE
  $ harness k8s:create-role

OPTIONS
  --kubeconfig=kubeconfig                            Path to a kubeconfig file. If not specified, the following search
                                                     order takes precedence: KUBECONFIG environment variable, default
                                                     kubectl config file (i.e. ~/.kube/config).

  --listDeploymentsInDefaultNamespace                Grants the account permissions to list deployments in the default
                                                     namespace. This is required for cloud provider validation to be
                                                     successful without skipping validation.

  --name=name                                        [default: harness] The name of the role

  --namespace=namespace                              The namespace to create the role in. If not specified, the default
                                                     namespace in your kubeconfig will be used

  --namespaceAdmin                                   Grant full permissions to a specific namespace.

  --serviceAccount=serviceAccount                    [default: harness] Specify a service account to create a role
                                                     binding for

  --serviceAccountNamespace=serviceAccountNamespace  The namespace of the service account. If not provided, the service
                                                     account for the role is used.
```

_See code: [src/commands/k8s/create-role.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/k8s/create-role.ts)_

## `harness k8s:create-service-account`

Create a kubernetes service account

```
USAGE
  $ harness k8s:create-service-account

OPTIONS
  --kubeconfig=kubeconfig  Path to a kubeconfig file. If not specified, the following search order takes precedence:
                           KUBECONFIG environment variable, default kubectl config file (i.e. ~/.kube/config).

  --name=name              [default: harness] The name of the service account

  --namespace=namespace    The name of the namespace. If not specified, the default namespace in your kubeconfig will be
                           used
```

_See code: [src/commands/k8s/create-service-account.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/k8s/create-service-account.ts)_

## `harness k8s:get-service-account`

Get a kubernetes service account

```
USAGE
  $ harness k8s:get-service-account

OPTIONS
  --kubeconfig=kubeconfig  Path to a kubeconfig file. If not specified, the following search order takes precedence:
                           KUBECONFIG environment variable, default kubectl config file (i.e. ~/.kube/config).

  --name=name              [default: harness] The name of the service account

  --namespace=namespace    The name of the namespace. If not specified, the default namespace in your kubeconfig will be
                           used
```

_See code: [src/commands/k8s/get-service-account.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/k8s/get-service-account.ts)_

## `harness secrets:create`

Create a new secret

```
USAGE
  $ harness secrets:create

OPTIONS
  -n, --name=name
      (required) The name of the secret

  -v, --value=value
      (required) The value of the secret

  --accountScope
      Scope this secret to the account for use in delegate profiles

  --scope=scope
      [default: ALL_APPS::PROD_ENVS,ALL_APPS::NON_PROD_ENVS] 
      Restrict the use of this resource to specific Harness components.  
      The expected format is "application::environment".  
      The supported values for applications are "ALL_APPS", an application name, or an application id.  
      The supported values for environments are "PROD_ENVS", "NON_PROD_ENVS", an environment name, or an environment id.

      Examples:
      All applications, production environments: "ALL_APPS::PROD_ENVS"
      All applications, non-production environments: "ALL_APPS::NON_PROD_ENVS"
      Specific application, specific environment: "MyCoolApp::development"
      Specific application, non-production environment: "rPyC0kD_SbymffS26SC_GQ::nonprod"

  --secretManager=secretManager
      (required) The id of the secret manager to leverage

  --skipExisting
      If true, this command will not fail if an resource with the same name already exists.

  --type=(ENCRYPTED_TEXT)
      (required) [default: ENCRYPTED_TEXT]

ALIASES
  $ harness secret:create
  $ harness secrets:create
```

_See code: [src/commands/secrets/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/secrets/create.ts)_

## `harness secrets:delete`

Delete a secret

```
USAGE
  $ harness secrets:delete

OPTIONS
  -n, --name=name          The name of the secret
  --id=id                  The id of the secret
  --type=(ENCRYPTED_TEXT)  (required) [default: ENCRYPTED_TEXT]

ALIASES
  $ harness secret:delete
  $ harness secrets:delete
```

_See code: [src/commands/secrets/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/secrets/delete.ts)_

## `harness secrets:get`

Get Secret By Id or By Name

```
USAGE
  $ harness secrets:get

OPTIONS
  -n, --name=name          The name of the secret
  --id=id                  The id of the secret
  --type=(ENCRYPTED_TEXT)  (required) [default: ENCRYPTED_TEXT]

ALIASES
  $ harness secret:get
  $ harness secrets:get
```

_See code: [src/commands/secrets/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/secrets/get.ts)_

## `harness secrets:update`

Update a text secret

```
USAGE
  $ harness secrets:update

OPTIONS
  -n, --name=name
      The name of the secret.  If you want to rename a secret, then secret ID must also be provided.

  -v, --value=value
      (required) The value of the secret

  --accountScope
      Scope this secret to the account for use in delegate profiles

  --id=id
      The id of the secret

  --scope=scope
      [default: ALL_APPS::PROD_ENVS,ALL_APPS::NON_PROD_ENVS] 
      Restrict the use of this resource to specific Harness components.  
      The expected format is 'application::environment'.  
      The supported values for applications are 'ALL_APPS', an application name, or an application id.  
      The supported values for environments are 'PROD_ENVS', 'NON_PROD_ENVS', an environment name, or an environment id.

      Examples:
      All applications, production environments: 'ALL_APPS::PROD_ENVS'
      All applications, non-production environments: 'ALL_APPS::NON_PROD_ENVS'
      Specific application, specific environment: 'MyCoolApp::development'
      Specific application, non-production environment: 'rPyC0kD_SbymffS26SC_GQ::nonprod'

ALIASES
  $ harness secret:update
  $ harness secrets:update
```

_See code: [src/commands/secrets/update.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/secrets/update.ts)_

## `harness template:exec`

Apply steps defined in template manifest and send reults to target Harness account.

```
USAGE
  $ harness template:exec

OPTIONS
  -v, --var=var                      Set a variable specified within the template.  Format is --var "templateVar=My
                                     Value"

  --dryRun                           Executes all template steps but does not push result to destination

  --harnessPassword=harnessPassword  [DEPRECATED] The Harness password. Can also be set via HARNESS_PASSWORD environment
                                     variable.

  --harnessUsername=harnessUsername  [DEPRECATED] The Harness username. Can also be set via HARNESS_USERNAME environment
                                     variable.

  --manifest=manifest                (required) A template manifest in either YAML or JSON format.  Can be a local file
                                     or URL.
```

_See code: [src/commands/template/exec.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/template/exec.ts)_

## `harness users:create`

Create user

```
USAGE
  $ harness users:create

OPTIONS
  -e, --email=email  (required) The email of the user
  -n, --name=name    (required) The name of the user
  --group=group      [default: ] The name or id of a Harness group

ALIASES
  $ harness user:create
  $ harness users:create
```

_See code: [src/commands/users/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/users/create.ts)_

## `harness users:delete`

Delete user by email/name/id

```
USAGE
  $ harness users:delete

OPTIONS
  -n, --name=name  The name of the user
  --email=email    The email of the user
  --id=id          The id of the user

ALIASES
  $ harness user:delete
  $ harness users:delete
```

_See code: [src/commands/users/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/users/delete.ts)_

## `harness users:get`

Get user by email/name/id

```
USAGE
  $ harness users:get

OPTIONS
  -n, --name=name  The name of the user
  --email=email    The email of the user
  --id=id          The id of the user

ALIASES
  $ harness user:get
  $ harness users:get
```

_See code: [src/commands/users/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/users/get.ts)_

## `harness users:list`

List users

```
USAGE
  $ harness users:list

ALIASES
  $ harness user:list
  $ harness users:list
```

_See code: [src/commands/users/list.ts](https://github.com/ldhertert/harness-cli/blob/v0.11.0/src/commands/users/list.ts)_
<!-- commandsstop -->

Development
===========

## Common tasks

Generate new command

  ```
  npx oclif command applications:create
  ```

Update autogenerated portions of the README

  ```
  npx oclif-dev readme
  ```

Build dockerfile

  ```
  docker build --rm -t harness-cli .
  docker run --rm harness-cli --version
  ```

Releasing
  
```sh
export GITHUB_TOKEN='xxxx'
npm run release
```
