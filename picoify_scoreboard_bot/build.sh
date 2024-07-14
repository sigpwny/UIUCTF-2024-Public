#!/usr/bin/env sh

set -ex

# based on: resource "google_artifact_registry_repository" "status"
LOCATION="us-central1"
PROJECT="<GCP PROJECT ID>"
REPOSITORY="status-bot"
IMAGE="picoify-scoreboard-bot"

FULL_IMAGE="${LOCATION}-docker.pkg.dev/${PROJECT}/${REPOSITORY}/${IMAGE}"

docker build -t "${FULL_IMAGE}" ./bot
docker push "${FULL_IMAGE}"
gcloud artifacts docker images list --sort-by=~update_time "${FULL_IMAGE}"
echo "Add the latest image to bot.yaml"
