# Picoify scoreboard bot

## Build and update

- run `./build` (does the following)
    - build docker container
    - push to artifact registry
- use `kubectl apply -f bot.yaml` to deploy to k8s
    - **be sure to update with new sha256 from artifact registry**

## Creating webhook

- create a webhook for a specific channel
- use the `./init_webhook.py` script with the `WEBHOOK` env var set to the webhook url
- also update `bot.secret.yaml` and run `kubectl apply -f bot.secret.yaml`
- save the `id` from the returned json, put that into `bot.yaml` under for `MESSAGE_ID`
- run `kubectl apply -f bot.yaml`
