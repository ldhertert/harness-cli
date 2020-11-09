#!/bin/bash  
set -e
export $(grep -v '^#' .env | xargs)

export HARNESS_CLI_SILENT='true'

echo "Creating secret"
harness secret:create --name test-github-token-secret --value "${GITHUB_TOKEN}" --secretManager eWxcSyuVSpiPzXTjsMvxyw

echo "Creating github repo"
harness github:create-repo --org luke-hertert --repo test-suite-repo

echo "Creating git connector"
harness connectors:create-git \
    --name test-github \
    --url https://github.com/luke-hertert/test-suite-repo.git \
    --username ldhertert \
    --passwordSecret test-github-token-secret


echo "Listing apps"
harness apps:list

echo "Creating app"
harness apps:create --name testing-app --syncEnabled --gitConnector test-github

echo "Getting app"
harness apps:get --nameOrId testing-app

echo "Updating app"
harness apps:update --nameOrId testing-app --newName testing-app-renamed

echo "Creating github webhook"
harness github:create-webhook --org luke-hertert --repo test-suite-repo --gitConnector test-github

echo "Creating k8s cloud provider"
harness cloud-providers:create-k8s --name test-k8s-cp --inheritFromDelegate 'plex' --skipValidation

echo "Getting k8s cloud provider"
harness cloud-providers:get --nameOrId test-k8s-cp

echo "Creating user"
harness users:create --email luke.hertert+cli-testing@harness.io --name 'CLI Testing'

echo "Listing users"
harness users:list

echo "Getting user"
harness users:get --email luke.hertert+cli-testing@harness.io

echo "Creating group"
harness groups:create --name testing-group

echo "Getting group"
harness groups:get --name testing-group

# harness template:exec ./template.yaml --var applicationName=testing-app-renamed --var serviceName=prometheus --dryRun --debug

echo "Config as code stuff"
harness config:list
harness config:get --path "Setup/Defaults.yaml" --raw
harness config:update --path "Setup/Defaults.yaml" --content "
harnessApiVersion: '1.0'                                    
type: APPLICATION_DEFAULTS
defaults:
- name: dfdsaf
  value: dsfasdf"
# harness config:delete --path "Setup/Tags.yaml"

### Clean up ###

echo "Cleaning up"
harness cloud-providers:delete --nameOrId test-k8s-cp
harness users:delete --email luke.hertert+cli-testing@harness.io
harness groups:delete --name testing-group
harness apps:delete --nameOrId testing-app-renamed
harness connectors:delete --name test-github
harness secret:delete --name test-github-token-secret
harness github:delete-repo --org luke-hertert --repo test-suite-repo