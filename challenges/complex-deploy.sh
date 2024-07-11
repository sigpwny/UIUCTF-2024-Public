#!/bin/bash
# This is YiFei's k8s deploy script, modified from kctf

REGISTRY=us.gcr.io
PROJECT=<GCP PROJECT ID>

PROJECT_NAME="$(basename "$PROJECT_DIR")"

function build_image {
  CONTAINER_NAME="$1"
  CONTAINER_DIR="${PROJECT_DIR}/${CONTAINER_NAME}"
  IIDFILE="$(mktemp)"
  if find "${CONTAINER_DIR}" -type l -exec false {} + >/dev/null 2>/dev/null; then
    docker build "${CONTAINER_DIR}" --iidfile "${IIDFILE}"
  else
    tar -C "${CONTAINER_DIR}" -czh . | docker build --iidfile "${IIDFILE}" -
  fi
  if [[ $? -ne 0 ]]; then
    rm "${IIDFILE}"
    return 1
  fi
  IMAGE_ID=$(cat "${IIDFILE}")
  rm "${IIDFILE}"

  if [[ "${IMAGE_ID}" = sha256:* ]]; then
    IMAGE_ID=$(echo "${IMAGE_ID}" | cut -d ':' -f 2)
  fi
}

function build_images {
  declare -gA IMAGES_LOCAL
  for IMAGE in "${CONTAINERS[@]}"; do
    build_image "${IMAGE}" || return
    IMAGES_LOCAL["${IMAGE}"]="${IMAGE_ID}"
  done
}

function push_image {
  IMAGE_NAME=$1
  IMAGE_ID=$2

  IMAGE_URL="${REGISTRY}/${PROJECT}/${PROJECT_NAME}-${IMAGE_NAME}:${IMAGE_ID}"
  docker tag "${IMAGE_ID}" "${IMAGE_URL}" || return
  docker push "${IMAGE_URL}" || return
}

function push_images {
  declare -gA IMAGES_REMOTE
  for IMAGE in "${CONTAINERS[@]}"; do
    push_image "${IMAGE}" "${IMAGES_LOCAL[$IMAGE]}" || return
    IMAGES_REMOTE["${IMAGE}"]="${IMAGE_URL}"
  done
}

build_images || exit 1
push_images || exit 1
hook_start || exit 1

if [[ -e "${PROJECT_DIR}/kube.yaml" ]]; then
  kubectl apply -f "${PROJECT_DIR}/kube.yaml" || exit 1
fi
