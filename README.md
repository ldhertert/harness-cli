harness-cli
===========

[![Version](https://img.shields.io/npm/v/@ldhertert/harness-cli.svg)](https://npmjs.org/package/@ldhertert/harness-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@ldhertert/harness-cli.svg)](https://npmjs.org/package/@ldhertert/harness-cli)
[![License](https://img.shields.io/npm/l/@ldhertert/harness-cli.svg)](https://github.com/ldhertert/harness-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
<!-- usage -->
```sh-session
$ npm install -g @ldhertert/harness-cli
$ harness COMMAND
running command...
$ harness (-v|--version|version)
@ldhertert/harness-cli/0.9.4 darwin-x64 node-v12.18.3
$ harness --help [COMMAND]
USAGE
  $ harness COMMAND
...
```
<!-- usagestop -->

# Commands
<!-- commands -->
* [`harness application:create NAME [DESCRIPTION]`](#harness-applicationcreate-name-description)
* [`harness application:delete NAMEORID`](#harness-applicationdelete-nameorid)
* [`harness application:get NAMEORID`](#harness-applicationget-nameorid)
* [`harness application:list`](#harness-applicationlist)
* [`harness application:update NAMEORID`](#harness-applicationupdate-nameorid)
* [`harness base-command`](#harness-base-command)
* [`harness cloud-provider:create-k8s NAME`](#harness-cloud-providercreate-k8s-name)
* [`harness cloud-provider:delete NAMEORID`](#harness-cloud-providerdelete-nameorid)
* [`harness cloud-provider:get NAMEORID`](#harness-cloud-providerget-nameorid)
* [`harness connectors:create-git NAME URL`](#harness-connectorscreate-git-name-url)
* [`harness connectors:delete NAMEORID`](#harness-connectorsdelete-nameorid)
* [`harness github:create-repo ORG NAME`](#harness-githubcreate-repo-org-name)
* [`harness github:create-webhook ORG NAME`](#harness-githubcreate-webhook-org-name)
* [`harness github:delete-repo [FILE]`](#harness-githubdelete-repo-file)
* [`harness groups:create NAME`](#harness-groupscreate-name)
* [`harness groups:delete NAMEORID`](#harness-groupsdelete-nameorid)
* [`harness groups:get NAMEORID`](#harness-groupsget-nameorid)
* [`harness groups:list`](#harness-groupslist)
* [`harness help [COMMAND]`](#harness-help-command)
* [`harness secrets:create NAME VALUE`](#harness-secretscreate-name-value)
* [`harness secrets:delete NAMEORID`](#harness-secretsdelete-nameorid)
* [`harness template:exec MANIFEST`](#harness-templateexec-manifest)
* [`harness users:create EMAIL NAME`](#harness-userscreate-email-name)
* [`harness users:delete USER`](#harness-usersdelete-user)
* [`harness users:get USER`](#harness-usersget-user)
* [`harness users:list`](#harness-userslist)

## `harness application:create NAME [DESCRIPTION]`

Create a new Harness application

```
USAGE
  $ harness application:create NAME [DESCRIPTION]

ARGUMENTS
  NAME         The name of the application
  DESCRIPTION  A description of the application

OPTIONS
  -s, --silent                         Supress stdout logging
  --branch=branch                      The branch name to use for git sync
  --gitConnector=gitConnector          The name or id of the git connector to use for git sync

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

  --syncEnabled                        Whether or not git sync should be enabled

ALIASES
  $ harness app:create
  $ harness apps:create
  $ harness applications:create
  $ harness application:create
```

_See code: [src/commands/application/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/application/create.ts)_

## `harness application:delete NAMEORID`

Delete an application

```
USAGE
  $ harness application:delete NAMEORID

ARGUMENTS
  NAMEORID  The current name or id of the application

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness app:delete
  $ harness apps:delete
  $ harness applications:delete
  $ harness application:delete
```

_See code: [src/commands/application/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/application/delete.ts)_

## `harness application:get NAMEORID`

Get an application

```
USAGE
  $ harness application:get NAMEORID

ARGUMENTS
  NAMEORID  The name or id of the application

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness app:get
  $ harness apps:get
  $ harness applications:get
  $ harness application:get
```

_See code: [src/commands/application/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/application/get.ts)_

## `harness application:list`

List Applications

```
USAGE
  $ harness application:list

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness app:list
  $ harness apps:list
  $ harness applications:list
  $ harness application:list
```

_See code: [src/commands/application/list.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/application/list.ts)_

## `harness application:update NAMEORID`

Update an application

```
USAGE
  $ harness application:update NAMEORID

ARGUMENTS
  NAMEORID  The current name or id of the application

OPTIONS
  -s, --silent                         Supress stdout logging
  --branch=branch                      The branch name to use for git sync

  --description=description            The new description of the application. If omitted, the value will remain
                                       unchanged.

  --gitConnector=gitConnector          The name or id of the git connector to use for git sync

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

  --name=name                          The new name of the application.  If omitted, the value will remain unchanged.

  --syncEnabled                        Whether or not git sync should be enabled. If omitted, the value will remain
                                       unchanged.

ALIASES
  $ harness app:update
  $ harness apps:update
  $ harness applications:update
  $ harness application:update
```

_See code: [src/commands/application/update.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/application/update.ts)_

## `harness base-command`

```
USAGE
  $ harness base-command

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable
```

_See code: [src/commands/base-command.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/base-command.ts)_

## `harness cloud-provider:create-k8s NAME`

Create a new application

```
USAGE
  $ harness cloud-provider:create-k8s NAME

ARGUMENTS
  NAME  The name of the application

OPTIONS
  -s, --silent                                           Supress stdout logging

  --harnessAccountId=harnessAccountId                    The Harness Account Id.  Can also be set via HARNESS_ACCOUNT
                                                         environment variable.

  --harnessApiKey=harnessApiKey                          The Harness API Key. Can also be set via HARNESS_API_KEY
                                                         environment variable.

  --inheritFromDelegate=inheritFromDelegate              If true, permissions are inherited from the delegate instead of
                                                         being explicitly provided

  --managerUrl=managerUrl                                [default: https://app.harness.io] The Harness Manager URL.  Can
                                                         also be set via HARNESS_MANAGER_URL environment variable

  --masterUrl=masterUrl                                  The Kubernetes master node URL. The easiest method to obtain
                                                         the master URL is using kubectl: kubectl cluster-info

  --serviceAccountTokenSecret=serviceAccountTokenSecret  The name or id of the secret that contains the service account
                                                         token

  --skipValidation

ALIASES
  $ harness cloud-provider:create-k8s
  $ harness cloud-providers:create-k8s
```

_See code: [src/commands/cloud-provider/create-k8s.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/cloud-provider/create-k8s.ts)_

## `harness cloud-provider:delete NAMEORID`

Delete cloud provider

```
USAGE
  $ harness cloud-provider:delete NAMEORID

ARGUMENTS
  NAMEORID  The name or id of the cloud provider

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness cloud-provider:delete
  $ harness cloud-providers:delete
```

_See code: [src/commands/cloud-provider/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/cloud-provider/delete.ts)_

## `harness cloud-provider:get NAMEORID`

Get cloud provider

```
USAGE
  $ harness cloud-provider:get NAMEORID

ARGUMENTS
  NAMEORID  The name or id of the cloud provider

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness cloud-provider:get
  $ harness cloud-providers:get
```

_See code: [src/commands/cloud-provider/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/cloud-provider/get.ts)_

## `harness connectors:create-git NAME URL`

Create git connector

```
USAGE
  $ harness connectors:create-git NAME URL

ARGUMENTS
  NAME  The name of the user
  URL   The url for the repository

OPTIONS
  -s, --silent                         Supress stdout logging
  --branch=branch                      [default: master] The git branch name

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

  --passwordSecret=passwordSecret      (required) The name or id of the secret that contains the password to be used for
                                       git authentication

  --username=username                  (required) The username to be used for git authentication

ALIASES
  $ harness connector:create-git
  $ harness connectors:create-git
```

_See code: [src/commands/connectors/create-git.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/connectors/create-git.ts)_

## `harness connectors:delete NAMEORID`

Delete connector

```
USAGE
  $ harness connectors:delete NAMEORID

ARGUMENTS
  NAMEORID  The name or id of the connector

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness connector:delete
  $ harness connectors:delete
```

_See code: [src/commands/connectors/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/connectors/delete.ts)_

## `harness github:create-repo ORG NAME`

Create a new GitHub Repository in an Organization

```
USAGE
  $ harness github:create-repo ORG NAME

ARGUMENTS
  ORG   The Github Organization
  NAME  The repository name

OPTIONS
  --baseUrl=baseUrl                       (required) [default: https://api.github.com] The Github API base url
  --description=description               A description of the application

  --token=token                           (required) The GitHub token for authentication.  This can also be set via the
                                          environment variable GITHUB_TOKEN.

  --visibility=(private|public|internal)  [default: private] Visibility settings for the repository
```

_See code: [src/commands/github/create-repo.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/github/create-repo.ts)_

## `harness github:create-webhook ORG NAME`

Create a new webhook in a GitHub repo for a Harness git connector

```
USAGE
  $ harness github:create-webhook ORG NAME

ARGUMENTS
  ORG   The Github Organization
  NAME  The repository name

OPTIONS
  -s, --silent                         Supress stdout logging
  --baseUrl=baseUrl                    (required) [default: https://api.github.com] The Github API base url
  --gitConnector=gitConnector          (required) The name or id of the Harness git connector

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

  --token=token                        (required) The GitHub token for authentication.  This can also be set via the
                                       environment variable GITHUB_TOKEN.
```

_See code: [src/commands/github/create-webhook.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/github/create-webhook.ts)_

## `harness github:delete-repo [FILE]`

describe the command here

```
USAGE
  $ harness github:delete-repo [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/github/delete-repo.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/github/delete-repo.ts)_

## `harness groups:create NAME`

Create a new user group. Note - not all functionality has been implemented yet

```
USAGE
  $ harness groups:create NAME

ARGUMENTS
  NAME  The name of the group

OPTIONS
  -s, --silent                             Supress stdout logging

  --applicationScope=applicationScope      An application id or name.  This will replace any Application Restrictions
                                           with the provided applications.  Multiple values are allowed

  --copyPermissionFrom=copyPermissionFrom  Copy permissions from an existing group.

  --harnessAccountId=harnessAccountId      The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                           variable.

  --harnessApiKey=harnessApiKey            The Harness API Key. Can also be set via HARNESS_API_KEY environment
                                           variable.

  --managerUrl=managerUrl                  [default: https://app.harness.io] The Harness Manager URL.  Can also be set
                                           via HARNESS_MANAGER_URL environment variable

  --permissions=permissions                JSON encoded permissions object

ALIASES
  $ harness group:create
  $ harness groups:create
```

_See code: [src/commands/groups/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/groups/create.ts)_

## `harness groups:delete NAMEORID`

Delete user group

```
USAGE
  $ harness groups:delete NAMEORID

ARGUMENTS
  NAMEORID  The name or id of the user group

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness group:delete
  $ harness groups:delete
```

_See code: [src/commands/groups/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/groups/delete.ts)_

## `harness groups:get NAMEORID`

Get user group

```
USAGE
  $ harness groups:get NAMEORID

ARGUMENTS
  NAMEORID  The name or id of the user group

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness group:get
  $ harness groups:get
```

_See code: [src/commands/groups/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/groups/get.ts)_

## `harness groups:list`

List User groups

```
USAGE
  $ harness groups:list

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness group:list
  $ harness groups:list
```

_See code: [src/commands/groups/list.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/groups/list.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `harness secrets:create NAME VALUE`

Create a new secret

```
USAGE
  $ harness secrets:create NAME VALUE

ARGUMENTS
  NAME   The name of the secret
  VALUE  The value of the secret

OPTIONS
  -s, --silent
      Supress stdout logging

  --accountScope
      Scope this secret to the account for use in delegate profiles

  --harnessAccountId=harnessAccountId
      The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment variable.

  --harnessApiKey=harnessApiKey
      The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl
      [default: https://app.harness.io] The Harness Manager URL.  Can also be set via HARNESS_MANAGER_URL environment 
      variable

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

  --type=(ENCRYPTED_TEXT)
      (required) [default: ENCRYPTED_TEXT]

ALIASES
  $ harness secret:create
  $ harness secrets:create
```

_See code: [src/commands/secrets/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/secrets/create.ts)_

## `harness secrets:delete NAMEORID`

Delete a secret

```
USAGE
  $ harness secrets:delete NAMEORID

ARGUMENTS
  NAMEORID  The name or id of the secret

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

  --type=(ENCRYPTED_TEXT)              (required) [default: ENCRYPTED_TEXT]

ALIASES
  $ harness secret:delete
  $ harness secrets:delete
```

_See code: [src/commands/secrets/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/secrets/delete.ts)_

## `harness template:exec MANIFEST`

Apply steps defined in template manifest and send reults to target Harness account

```
USAGE
  $ harness template:exec MANIFEST

ARGUMENTS
  MANIFEST  A template manifest in either YAML or JSON format.  Can be a local file or URL.

OPTIONS
  -s, --silent                         Supress stdout logging
  -v, --var=var

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable
```

_See code: [src/commands/template/exec.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/template/exec.ts)_

## `harness users:create EMAIL NAME`

Create user

```
USAGE
  $ harness users:create EMAIL NAME

ARGUMENTS
  EMAIL  The email of the user
  NAME   The name of the user

OPTIONS
  -s, --silent                         Supress stdout logging
  --group=group                        [default: ] The name or id of a Harness group

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness user:create
  $ harness users:create
```

_See code: [src/commands/users/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/users/create.ts)_

## `harness users:delete USER`

Delete user by email/name/id

```
USAGE
  $ harness users:delete USER

ARGUMENTS
  USER  The email, name, or id of the user

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness user:delete
  $ harness users:delete
```

_See code: [src/commands/users/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/users/delete.ts)_

## `harness users:get USER`

Get user by email/name/id

```
USAGE
  $ harness users:get USER

ARGUMENTS
  USER  The email, name, or id of the user

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness user:get
  $ harness users:get
```

_See code: [src/commands/users/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/users/get.ts)_

## `harness users:list`

List users

```
USAGE
  $ harness users:list

OPTIONS
  -s, --silent                         Supress stdout logging

  --harnessAccountId=harnessAccountId  The Harness Account Id.  Can also be set via HARNESS_ACCOUNT environment
                                       variable.

  --harnessApiKey=harnessApiKey        The Harness API Key. Can also be set via HARNESS_API_KEY environment variable.

  --managerUrl=managerUrl              [default: https://app.harness.io] The Harness Manager URL.  Can also be set via
                                       HARNESS_MANAGER_URL environment variable

ALIASES
  $ harness user:list
  $ harness users:list
```

_See code: [src/commands/users/list.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.4/src/commands/users/list.ts)_
<!-- commandsstop -->
