# Import vars from .env file.  See comment below for an example of manual variable setting
export $(grep -v '^#' .env | xargs)
# export GITHUB_TOKEN=xxxx
# export HARNESS_ACCOUNT=xxxx
# export HARNESS_API_KEY=xxxx
# export HARNESS_USERNAME=xxxx
# export HARNESS_PASSWORD=xxxx
# export DOCKER_USERNAME=xxxx
# export DOCKER_PASSWORD=xxxx

export SECRET_MANAGER_ID='eWxcSyuVSpiPzXTjsMvxyw'

harness template:exec --manifest ./test/template-manifests/cv-demo.yaml \
    -v "dockerUsername=${DOCKER_USERNAME}" \
    -v "dockerPassword=${DOCKER_PASSWORD}" \
    -v "secretManagerId=${SECRET_MANAGER_ID}" \
    -v "delegateName=luke-mbp"

##### clean up #####

# harness application:delete --nameOrId cv-demo
# harness cloud-provider:delete --nameOrId cv-demo
# harness connector:delete --name cv-demo --type DockerConnector
# harness secrets:delete --name cv-demo-docker-password