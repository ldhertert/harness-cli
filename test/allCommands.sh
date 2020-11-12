#!/bin/bash  
set -e

# Import vars from .env file.  See comment below for an example of manual variable setting
export $(grep -v '^#' .env | xargs)
# export GITHUB_TOKEN=xxxx
# export HARNESS_ACCOUNT=xxxx
# export HARNESS_API_KEY=xxxx
# export HARNESS_USERNAME=xxxx
# export HARNESS_PASSWORD=xxxx

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

# harness template:exec --manifest ./test/template-manifests/git-files.yaml \
#    --var githubUsername=ldhertert --var "githubPassword=${GITHUB_TOKEN}"

# harness template:exec --manifest ./test/template-manifests/cv-demo.yaml --dryRun --debug

harness template:exec --manifest ./test/template-manifests/template.yaml \
    --var applicationName=testing-app-renamed \
    --var serviceName=prometheus2 \
    --var chartVersion=8.13.4 \
    --var githubUsername=ldhertert \
    --var "githubPassword=${GITHUB_TOKEN}"

echo "Config as code stuff"
harness config:list
harness config:get --path "Setup/Applications/Cluster Bootstrapping/Services/prometheus/Index.yaml"
harness config:create --path 'Setup/Applications/Plex/Services/ombi/Manifests/Files/templates/Test.yaml' --content '# testing'
harness config:delete --path 'Setup/Applications/Plex/Services/ombi/Manifests/Files/templates/Test.yaml'
harness config:update --path "Setup/Applications/Cluster Bootstrapping/Services/prometheus/Index.yaml" --content "harnessApiVersion: '1.0'
type: SERVICE
artifactType: DOCKER
deploymentType: HELM
helmVersion: V3"

harness k8s:create-namespace --name myapp 
harness k8s:create-service-account --name harness --namespace myapp | read token
harness k8s:get-service-account --name harness --namespace myapp --select token
harness secret:create --name k8s-myapp-sa-token --value "${token}" --secretManager eWxcSyuVSpiPzXTjsMvxyw

harness k8s:cluster-info --select master | read kubernetes_master


harness k8s:create-role --name harness --namespace myapp --serviceAccount harness --namespaceAdmin
harness k8s:create-role --listDeploymentsInDefaultNamespace --serviceAccount harness --serviceAccountNamespace myapp

### Clean up ###

echo "Cleaning up"
harness cloud-providers:delete --nameOrId test-k8s-cp
harness users:delete --email luke.hertert+cli-testing@harness.io
harness groups:delete --name testing-group
harness apps:delete --nameOrId testing-app-renamed
harness connectors:delete --name test-github
harness secret:delete --name test-github-token-secret
harness github:delete-repo --org luke-hertert --repo test-suite-repo