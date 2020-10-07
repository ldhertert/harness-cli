Onboarding New App Team
-----------------------

1. Create a new git repository - Github API
2. Create git connector - Harness GraphQL
3. Create application, enable git sync - Harness GraphQL
4. Create webhook in github - Github API
5. Create namespace in x clusters - kubectl (in harness workflow)
6. Create service account for each namespace - kubectl (in harness workflow)
7. Create secrets with service account tokens - kubectl (in harness workflow)
8. Create cloud providers and scope to application - Harness GraphQL
9. Create new user group, apply permissions - Harness GraphQL
10. Link Group to SSO group - Harness GraphQL
11. Invite users and add to group - Harness GraphQL
12. Populate initial application resources (ie services, environments, workflows, pipelines) - Harness YAML API
    * Service: change artifact source, helm chart, service variables


Steps
-----

* Manually Create new repository - https://github.com/ldhertert/harness-demo-application-backup
* Secret already exists for my github account - githubPassword
* Create git connector
    ```
    harness connectors:create-git \
        'Harness Demo Backup' \
        https://github.com/ldhertert/harness-demo-application-backup \
        --username=ldhertert \
        --passwordSecret=githubPassword
    ```
* Create github webhook - TODO
* Create application
    ```
    harness application:create \
        'Harness Demo Backup' \
        'A backup for the harness demo environment' \
        --gitConnector='Harness Demo Backup' \
        --syncEnabled
    ```
* Kubernetes stuff - TODO
* Create new group scoped to application
    ```
    harness groups:create \
        harness-demo-backup-developers \
        --copyPermissionFrom=nationwide \
        --applicationScope='Harness Demo Backup'
    ```
    * Note - haven't implemented the ability to add users to group
* Created 3 cloud providers
    * `harness cloud-provider:create-k8s harness-demo-backup-dev --inheritFromDelegate=plex`
    * `harness cloud-provider:create-k8s harness-demo-backup-stage --inheritFromDelegate=plex`
    * `harness cloud-provider:create-k8s harness-demo-backup-prod --inheritFromDelegate=plex`
    * These were not properly scoped to any application. Need to add scoping options
* Copied order service
    * Note: Even though the secret reference was invalid, the import didn't fail.  even worse, it shows the secret name for a secret in another account.   This appears to be the same behavior as via git sync.
* Copied dev environment
* Copied infra def, set cloud provider (didn't work due to scoping), changed infra def scope rules
* Copied workflow - it worked, although it probably shouldn't have.  Lots of the references are invalid.  Again i'm seeing things that I shouldn't see from another account... it's actually pulling the JIRA projects in the UI from a connector in another account
    * Things that i need to set
        * I probably need to create a jira and SNOW connector
        * User group for notifications
        * Delegate Selector