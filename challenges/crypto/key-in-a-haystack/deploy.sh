#!/bin/bash

PROJECT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)"
CONTAINERS=(challenge healthcheck)

function hook_start {
  yq eval "(select(.kind == \"Deployment\") | select(.metadata.name == \"main\") | .spec.template.spec.containers.[] | select(.name == \"challenge\").image) = \"${IMAGES_REMOTE[challenge]}\"" --inplace "${PROJECT_DIR}/kube.yaml" || return
  yq eval "(select(.kind == \"Deployment\") | select(.metadata.name == \"main\") | .spec.template.spec.containers.[] | select(.name == \"healthcheck\").image) = \"${IMAGES_REMOTE[healthcheck]}\"" --inplace "${PROJECT_DIR}/kube.yaml" || return
}

source "${PROJECT_DIR}/../../complex-deploy.sh"
