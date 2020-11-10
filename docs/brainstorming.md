Template flow
-------------

1) Create workspace
2) Fetch template manifest from source
3) Load manifest
4) Load user provided variables
5) Merge user provided variables with template variables with default values
6) Evaluate any templatized variables
7) Perform template variable validation with computed variables values
8) Fetch file contents from template source(s)
9) Apply template steps to workspace
10) Preview changes (diff, optional)
11) Upsert yaml results
12) Validate success
13) Cleanup workspace

Template definition
-------------------

* Name
* Description
* Template version
* Schema version
* Author
* Source
* Parent Template
    * Reference to parent template
* Variables
    * Name
    * Description
    * Type
    * Default
    * Required
* Sources
    * Name
    * Description
    * Type (inline, git, harness api, url)
    * Files[] (glob pattern)
* Steps
    * Type
    * Files[] (glob pattern)
    * Condition

Template execution
------------------    

* Inputs
    * Template source
    * Input vars
    * Credentials (not sure if this is included in input vars or separate item)
    * Destination
        * Manager URL
        * Account ID

Template source providers
----------------

* Local file
* File in git repo
* URL
* S3/minio


Source providers
----------------

* Local filesystem
* Inline definition in manifest
* Harness Config as Code API
* Git repo
* URL
* S3/minio

Destination providers
---------------------

* Local filesystem
* Harness Config as Code API
* Git repo

Variables
---------

* Environment variables
* vars file
* Secret manager?
* Types
    * String
    * Boolean
    * Number
    * List
    * Map
    * JSON
    * YAML
    * Harness Resource Ref
        * type (application, service, cloud provider, secret, etc)
        * name
        * id
        * create if not exists?

Steps
-----

**Design considerations**

* Container based steps?
* Drone pipeline?
* Non-containerized runner for built in steps (rename, delete, set value, replace string, etc)
* Logging (debug, trace, info, error)
* Workspace/filesystem abstraction
* Credentials/secrets/config management

**Supported steps**

* File Path Replace
    * Search pattern
    * Replacement value
* Set yaml value
    * Property
    * Value
* Contents Replace
    * Search pattern
    * Replacement value
* Run containerized step
    * Image
    * Tag
    * Environment variables
* JSON Patch
* YAML Patch
* Delete file
* Render with template engine
* Create harness resource via GraphQL
* Execute child/nested template
    * Template source
    * Input vars
    * Source = local filesystem (workspace)
    * Dest = local filesystem (workspace)

Base templates
--------------

* application
* k8s service
* pcf service
* docker registry artifact source
* environment
* k8s remote manifest 
* k8s helm chart
* k8s values yaml override (service, env)
* workflow - k8s canary
* workflow - k8s canary template
* template library command

Resources that should use GraphQL instead of config as code
-----------------------------------------------------------

* Secrets
* Triggers
* Users/groups

CLI Commands
------------

**Required**

* secrets:crud
* users:crud
* groups:crud
* scopes:add/remove/get/clear (secrets, cloud providers, connectors)
* triggers: crud
* template

**Nice to have**

* applications:crud
* delegate:install
* cloudproviders:crud (k8s, pcf, physical datacenter, aws, gcp, aks)
* download file(s) from source (url, git, s3)
* common troubleshooting commands (cloud provider connectivity check)
* upload/send delegate log files/config
* Trust CA cert
* Run k8s job
* Apply k8s manifest
* Create k8s service account (cluster admin, namespace admin, CE viewer), save service account token as secret
* Get resource id by name
* jq/jsonpath
* AWS IAM Roles creation/generation
* Create k8s cluster
* vault integration
* docker operations (pull/tag/push)
* git operations (clone/tag/push)
* github integration (create repo, create harness webhook, merge pull request, comment on issue, import git connector from repo in org, etc)
* create/publish new template
* GraphQL request
* Login
* Fetch accounts
* Trigger deployment
* Get deployment logs
* Export audit trail
* Create dashboard
