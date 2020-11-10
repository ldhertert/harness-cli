# Templates

The Harness CLI has a command called `template:exec` that allows you to perform a series of sequential steps to fetch source files, transform those files, and perform various tasks.  Once all steps are successfully completed, any transformed files in the workspace will be pushed to the target Harness account.

# Template Structure

A template file can be defined in either JSON or YAML, and can either be a local file or a URL.  

* `name` - The template name
* `description` - A description of the template (optional)
* `templateVersion` - The version of the template (optional)
* `author` - The author of the template (optional)
* `sourceFiles` - An array of inline files to be included in the workflow execution (optional)
* `variables` - An array of variables that a user can provide at template execution time which can be referenced within each step
* `steps` - An array of steps that will be executed sequentially that either fetch files and add them to the current execution context, transform files within the current execution context, or perhaps might take some sort of external action.

You can view example templates [here](../test/template-manifests).

# Template Execution

## Inputs

* User provided variables
* Harness credentials for destination
* Is dry run

## Execution process overview

* Load template - Read from file or url, parse from JSON or YAML into object
* Parse template - Convert into object from JSON or YAML
* Initialize Harness API client to destination
* Initialize execution context - vars, workspace (virtual filesystem), outputs
* Process variables - combine user provided variable inputs with variable defaults
* Validate variables - ensure that all required variables have a value
* Execute steps sequentially
* Take all files in workspace at and upsert via Harness config as code API (if this is not a dry run)

# Execution Context

The execution context is the internal state that is passed from step to step, and eventually is pushed to the destination.

* `vars` - Object representing the combination of user provided values and template defautls
* `workspace` - An array of objects that contain a path and YAML content
* `outputs` - An object that contains results from step executions

# Variables

* `name` (required)
* `description`
* `type` (required) - Note: Currently these are not validated or processed in any proper way.  User provided variables are always processed as strings, and the default value is simply processed via object deserialization. 
    * String
    * Boolean
    * Number
    * Object
* `defaultValue`
* `required`

## Example

```yaml
variables:
  - name: applicationName
    description: The target application name
    type: String
    required: true
    defaultValue: My new app
```

## Default variables

At template initialization time, a variable named `destination` is populated with Harness credentials for the target destination.  These are used as defaults in steps that call the Harness API (in most cases, the source and destination accoutns will be the same). Sample object:

```json
{
    "vars": {
        "destination": {
          "apiKey": "",
          "accountId": "",
          "managerUrl": "",
          "username": "",
          "password": ""
        }
    }
}
```

# Source Files

It is generally recommended to load source files from the Harness API or from a git repository that is actively being synced to by Harness.  This is because these sources are guaranteed to have a valid and current schema.  That said, it is also possible to embed source files directly into a template.  The risk in this scenario is that the Harness YAML schema could change and there is no guarantee that an outdated schema will be supported.  

Example definition for embedded source files:

```yaml
sourceFiles:
  - path: Setup/Applications/Cluster Bootstrapping/prometheus/Index.yaml
    content: |
      harnessApiVersion: '1.0'
      type: SERVICE
      artifactType: DOCKER
      deploymentType: HELM
      helmVersion: V3
```

# Steps

There are two high level step types currently implemented - a file source step that fetches source files and adds them to the execution workspace, and transformational step types that take the current workspace and modifies it in some way.

* `name` (required)
* `description`
* `type` (required) - `FileSource`, `RenameFile`, `SetValue` are the only currently supported step types
* `files` - This field acts as a filter for which files should be processed.  In a file source step, it will impact which files should be added to the workspace.  In the transformational steps, it will filter which workspace files should be processed by the step.  It is an array, and can be a concrete path or a glob pattern.  The specified value will be processed by the template engine prior to execution.
* `condition` - Condition for execution.  This is not currently implemented

## FileSource Step

This step executes the following: 

* Initializes the storage provider with the provided options (Harness API, git, local filesystem)
* Fetch the file tree from the storage provider
* Filter file tree based on `files` value
* Fetch file contents for filtered paths
* Add file object to workspace if it does not exist, otherwise update content if it does.

Properties:

* All properties described above for all steps
* `type` is `FileSource`
* `source`
    * `sourceType` is either `Harness`, `Git`, or `Local`
    * `opts` contains connection info that is provider specific.  See below for details


### Harness file source:

Options:

* apiKey
* accountId
* managerUrl
* username
* password

Example:

```yaml
steps:
  - name: Copy prometheus service
    type: FileSource
    source:
      sourceType: Harness
      # The options below will default to the options used for the destination.  But they can be explicitly specified here
      # opts:
      #   apiKey: <%= vars.harnessApiKey %>
      #   accountId: <%= vars.harnessAccountId %>
      #   managerUrl: <%= vars.harnessManagerUrl %>
      #   username: <%= vars.harnessUsername %>
      #   password: <%= vars.harnessPassword %>
    files:
      - Setup/Applications/Cluster Bootstrapping/Services/prometheus/**/*.yaml
```

### Git file source

Options:

* `directory`: The directory on the local machine that the repo should be checked out to.  Defaults to a temp directory
* `repo`: The repository URL (required)
* `ref`: The ref to check out.  Defaults to `master`
* `auth`
    * `username`
    * `password`
* `author`
    * `name` (default: 'Harness Automation')
    * `email` (default: 'no-reply@harness.io')

Example:

```yaml
steps:
  - name: Copy prometheus service
    type: FileSource
    source:
      sourceType: Git
      opts:
        directory: /tmp
        repo: https://github.com/ldhertert/luke-testing-harness.git
        ref: master
        auth:
            username: <% vars.username %>
            password: <% vars.password %>
    files:
      - Setup/Applications/Cluster Bootstrapping/Services/prometheus/**/*.yaml
```

### Filesystem file source

Options:

* `directory`: The directory on the local machine that the repo should be checked out to.  Defaults to a temp directory

Example:

```yaml
steps:
  - name: Copy prometheus service
    type: FileSource
    source:
      sourceType: Local
      opts:
        directory: /tmp
    files:
      - Setup/Applications/Cluster Bootstrapping/Services/prometheus/**/*.yaml
```

## RenameFile Step

Modify path for all affected files in workspace.  This is important because most resource names in harness are represented by the file path in config as code.  For example, if you want to copy a resource from one application to another, you will need to rename all files to replace the application name.

Options:

* `type`: `RenameFile`
* `search`: The string to search for in find and replace operation
* `replace`: The string to replace with in find and replace operation

Example:

```yaml
steps:
  - name: Rename application
    type: RenameFile
    search: Setup/Applications/Cluster Bootstrapping/
    replace: Setup/Applications/<%= vars.applicationName %>/
  - name: Rename service
    type: RenameFile
    search: Setup/Applications/<%= vars.applicationName %>/Services/prometheus
    replace: Setup/Applications/<%= vars.applicationName %>/Services/<%= vars.serviceName %>
```

## SetValue Step

Set a value within the YAML at the specified object path.  The target value can be as simple string/boolean/number, or a complex object, or an empty object.  

Options: 

* `type`: `SetValue`
* `path`: The path to the property that should be set.  The syntax for this is defined in the [lodash documentation](https://lodash.com/docs/4.17.15#set)
* `value`: The value to set

Example:

```yaml
steps:
  - name: Set development cloud provider name
    type: SetValue
    file: "**/*/GKE Dev Cluster.yaml"
    path: infrastructure[0].cloudProviderName
    value: harness-demo-backup-dev

  - name: Clear variable overrides for order service
    type: SetValue
    path: variableOverrides
    file: Setup/Applications/Harness Demo Application/Environments/development/Index.yaml
    value: []

  - name: Set development cloud provider name
    type: SetValue
    path: scopedServices
    file:
      Setup/Applications/Harness Demo Application/Environments/development/Infrastructure
      Definitions/GKE Dev Cluster.yaml
    value:
      - order-service
      
  - name: Set chart version
    type: SetValue
    path: helmChartConfig.chartVersion
    file: Setup/Applications/<%= vars.applicationName %>/Services/<%= vars.serviceName %>/Manifests/Index.yaml
    value: <%= vars.chartVersion %>           
```