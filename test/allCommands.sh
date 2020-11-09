#!/bin/bash  
set -e
export $(grep -v '^#' .env | xargs)

harness secret:create test-github-token-secret "${GITHUB_TOKEN}" --secretManager eWxcSyuVSpiPzXTjsMvxyw --silent \
    && echo "Created github token secret"

harness github:create-repo luke-hertert test-suite-repo

harness connectors:create-git test-github https://github.com/luke-hertert/test-suite-repo.git \
    --username ldhertert \
    --passwordSecret test-github-token-secret \
    --silent \
    && echo "Created git connector"

harness apps:list --silent && echo 'Listed applications'
harness apps:create testing-app --syncEnabled --gitConnector test-github --silent && echo 'Created new application'
harness apps:get testing-app --silent && echo 'Got application by name'
harness apps:update testing-app --name testing-app-renamed --silent && echo 'Updated application'

harness github:create-webhook luke-hertert test-suite-repo --gitConnector test-github --silent && echo 'Set up github webhook'

harness cloud-providers:create-k8s test-k8s-cp --inheritFromDelegate 'plex' --skipValidation --silent && echo 'Created cloud provider'
harness cloud-providers:get test-k8s-cp --silent && echo 'Got cloud provider by name'

harness users:create luke.hertert+cli-testing@harness.io 'CLI Testing' --silent && echo 'Created user'
harness users:list --silent && echo 'Listed users'
harness users:get luke.hertert+cli-testing@harness.io --silent && echo 'Got user by email'

harness groups:create testing-group --silent && echo 'Created user group'
harness groups:get testing-group --silent && echo 'Got user group by name'
harness groups:delete testing-group --silent && echo 'Delete user group by name'

### Clean up ###

harness cloud-providers:delete test-k8s-cp --silent && echo 'Deleted cloud provider'
harness users:delete luke.hertert+cli-testing@harness.io --silent && echo 'Deleted user'
harness apps:delete testing-app-renamed --silent && echo 'Deleted application'
harness connectors:delete test-github --silent && echo 'Deleted git connector'
harness secret:delete test-github-token-secret --silent && echo 'Deleted github token secret'
harness github:delete-repo luke-hertert test-suite-repo --silent && echo 'Deleted github repo'