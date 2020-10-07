harness-cli
===========

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/harness-cli.svg)](https://npmjs.org/package/@ldhertert/harness-cli)
[![Downloads/week](https://img.shields.io/npm/dw/harness-cli.svg)](https://npmjs.org/package/@ldhertert/harness-cli)
[![License](https://img.shields.io/npm/l/harness-cli.svg)](https://github.com/ldhertert/harness-cli/blob/master/package.json)

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
@ldhertert/harness-cli/0.9.3 darwin-x64 node-v12.18.3
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
* [`harness cloud-provider:create-k8s NAME`](#harness-cloud-providercreate-k8s-name)
* [`harness connectors:create-git NAME URL`](#harness-connectorscreate-git-name-url)
* [`harness github:create-repo ORG NAME`](#harness-githubcreate-repo-org-name)
* [`harness github:create-webhook`](#harness-githubcreate-webhook)
* [`harness groups:create NAME`](#harness-groupscreate-name)
* [`harness groups:get NAMEORID`](#harness-groupsget-nameorid)
* [`harness groups:list`](#harness-groupslist)
* [`harness help [COMMAND]`](#harness-help-command)
* [`harness secrets:create NAME VALUE`](#harness-secretscreate-name-value)
* [`harness template:exec MANIFEST`](#harness-templateexec-manifest)
* [`harness users:create EMAIL NAME`](#harness-userscreate-email-name)
* [`harness users:get USER`](#harness-usersget-user)

## `harness application:create NAME [DESCRIPTION]`

Create a new application

```
USAGE
  $ harness application:create NAME [DESCRIPTION]

ARGUMENTS
  NAME         The name of the application
  DESCRIPTION  A description of the application

OPTIONS
  --branch=branch                      The branch name to use for git sync
  --gitConnector=gitConnector          The name or id of the git connector to use for git sync
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
  --syncEnabled                        Whether or not git sync should be enabled
```

_See code: [src/commands/application/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/application/create.ts)_

## `harness application:delete NAMEORID`

Delete an application

```
USAGE
  $ harness application:delete NAMEORID

ARGUMENTS
  NAMEORID  The current name or id of the application

OPTIONS
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
```

_See code: [src/commands/application/delete.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/application/delete.ts)_

## `harness application:get NAMEORID`

Get an application

```
USAGE
  $ harness application:get NAMEORID

ARGUMENTS
  NAMEORID  The name or id of the application

OPTIONS
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
```

_See code: [src/commands/application/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/application/get.ts)_

## `harness application:list`

List Applications

```
USAGE
  $ harness application:list

OPTIONS
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
```

_See code: [src/commands/application/list.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/application/list.ts)_

## `harness application:update NAMEORID`

Update an application

```
USAGE
  $ harness application:update NAMEORID

ARGUMENTS
  NAMEORID  The current name or id of the application

OPTIONS
  --branch=branch                      The branch name to use for git sync

  --description=description            The new description of the application. If omitted, the value will remain
                                       unchanged.

  --gitConnector=gitConnector          The name or id of the git connector to use for git sync

  --harnessAccountId=harnessAccountId  (required) The Harness Account Id

  --harnessApiKey=harnessApiKey        (required) The Harness API Key

  --name=name                          The new name of the application.  If omitted, the value will remain unchanged.

  --syncEnabled                        Whether or not git sync should be enabled. If omitted, the value will remain
                                       unchanged.
```

_See code: [src/commands/application/update.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/application/update.ts)_

## `harness cloud-provider:create-k8s NAME`

Create a new application

```
USAGE
  $ harness cloud-provider:create-k8s NAME

ARGUMENTS
  NAME  The name of the application

OPTIONS
  --harnessAccountId=harnessAccountId                    (required) The Harness Account Id
  --harnessApiKey=harnessApiKey                          (required) The Harness API Key

  --inheritFromDelegate=inheritFromDelegate              If true, permissions are inherited from the delegate instead of
                                                         being explicitly provided

  --masterUrl=masterUrl                                  The Kubernetes master node URL. The easiest method to obtain
                                                         the master URL is using kubectl: kubectl cluster-info

  --serviceAccountTokenSecret=serviceAccountTokenSecret  The name or id of the secret that contains the service account
                                                         token

  --skipValidation
```

_See code: [src/commands/cloud-provider/create-k8s.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/cloud-provider/create-k8s.ts)_

## `harness connectors:create-git NAME URL`

Create git connector

```
USAGE
  $ harness connectors:create-git NAME URL

ARGUMENTS
  NAME  The name of the user
  URL   The url for the repository

OPTIONS
  --branch=branch
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
  --passwordSecret=passwordSecret      (required)
  --username=username                  (required)
```

_See code: [src/commands/connectors/create-git.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/connectors/create-git.ts)_

## `harness github:create-repo ORG NAME`

Create a new GitHub Repository in an Organization

```
USAGE
  $ harness github:create-repo ORG NAME

ARGUMENTS
  ORG   The Github Organization
  NAME  The repository name

OPTIONS
  --baseUrl=baseUrl          (required) [default: https://api.github.com] The Github API base url
  --description=description  A description of the application
  --private                  Whether or not to make the repository private
  --token=token              (required) The GitHub token for authentication
```

_See code: [src/commands/github/create-repo.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/github/create-repo.ts)_

## `harness github:create-webhook`

Create a new webhook in a GitHub repo for a Harness git connector

```
USAGE
  $ harness github:create-webhook

OPTIONS
  --baseUrl=baseUrl                    (required) [default: https://api.github.com] The Github API base url
  --gitConnector=gitConnector          (required) The name or id of the Harness git connector
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
  --owner=owner                        (required) The owner of the repository
  --repo=repo                          (required) The repository name
  --token=token                        (required) The GitHub token for authentication
```

_See code: [src/commands/github/create-webhook.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/github/create-webhook.ts)_

## `harness groups:create NAME`

Create a new user group. Note - not all functionality has been implemented yet

```
USAGE
  $ harness groups:create NAME

ARGUMENTS
  NAME  The name of the group

OPTIONS
  --applicationScope=applicationScope      An application id or name.  This will replace any Application Restrictions
                                           with the provided applications.  Multiple values are allowed

  --copyPermissionFrom=copyPermissionFrom  Copy permissions from an existing group.

  --harnessAccountId=harnessAccountId      (required) The Harness Account Id

  --harnessApiKey=harnessApiKey            (required) The Harness API Key

  --permissions=permissions                JSON encoded permissions object
```

_See code: [src/commands/groups/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/groups/create.ts)_

## `harness groups:get NAMEORID`

Get user groups

```
USAGE
  $ harness groups:get NAMEORID

ARGUMENTS
  NAMEORID  The name or id of the user group

OPTIONS
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
```

_See code: [src/commands/groups/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/groups/get.ts)_

## `harness groups:list`

List User groups

```
USAGE
  $ harness groups:list

OPTIONS
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
```

_See code: [src/commands/groups/list.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/groups/list.ts)_

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
  --accountScope
      Scope this secret to the account for use in delegate profiles

  --harnessAccountId=harnessAccountId
      (required) The Harness Account Id

  --harnessApiKey=harnessApiKey
      (required) The Harness API Key

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

  --type=(ENCRYPTED_TEXT)
      (required) [default: ENCRYPTED_TEXT]
```

_See code: [src/commands/secrets/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/secrets/create.ts)_

## `harness template:exec MANIFEST`

Apply steps defined in template manifest and send reults to target Harness account

```
USAGE
  $ harness template:exec MANIFEST

ARGUMENTS
  MANIFEST  A template manifest in either YAML or JSON format.  Can be a local file or URL.

OPTIONS
  -v, --var=var
  --accountId=accountId      (required) The Harness Account Id
  --gitPassword=gitPassword  Password to use for git authentication
  --gitUsername=gitUsername  Username to use for git authentication
  --managerUrl=managerUrl    [default: https://app.harness.io] The Harness Manager URL
  --password=password        (required) The Harness API Key
  --username=username        (required) The Harness API Key
```

_See code: [src/commands/template/exec.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/template/exec.ts)_

## `harness users:create EMAIL NAME`

Create user

```
USAGE
  $ harness users:create EMAIL NAME

ARGUMENTS
  EMAIL  The email of the user
  NAME   The name of the user

OPTIONS
  --groups=groups
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
```

_See code: [src/commands/users/create.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/users/create.ts)_

## `harness users:get USER`

Get users

```
USAGE
  $ harness users:get USER

ARGUMENTS
  USER  The email, name, or id of the user

OPTIONS
  --harnessAccountId=harnessAccountId  (required) The Harness Account Id
  --harnessApiKey=harnessApiKey        (required) The Harness API Key
```

_See code: [src/commands/users/get.ts](https://github.com/ldhertert/harness-cli/blob/v0.9.3/src/commands/users/get.ts)_
<!-- commandsstop -->
