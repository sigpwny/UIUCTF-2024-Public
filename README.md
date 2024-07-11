# UIUCTF 2024 Public Release
Places of interest:
- `challenges/<CATEGORY>/<CHALLENGE NAME>/challenge/` for challenge files
- `rctf-theme/` for our custom rCTF Metro Mini theme
- `terraform/` and `k8s.yaml` for most infra related things
- `status_bot` and `picoify_status_bot` as the names imply
- Check out our forks of [`rCTF`]() and [`rCDS`]() if you're extra curious. The changes are not well documented, but the commit log should be informative

# Infra
## READ ME FIRST
**Do not** blindly run all of the below commands.
Many of these are shown here for documentation purposes, and multiple people running them multiple times can put our infrastructure in an abnormal state.
If you understand, please move onto [development environment](#development-environment).

### Development environment
A Nix [flake](flake.nix) has been provided for convenience, and you should probably use it unless you really know what you're doing©.
Run `nix develop` in the repo root to enter a shell with every dependency installed; simply `exit` the shell, and the packages are no longer in your `PATH`.
Suppress your primal instinct to run `pip install`/`apt install`, and use [`nix shell nixpkgs#<package>`](https://search.nixos.org/packages) if you need to install something on the fly (Nix shells can be nested arbitrarily deep).
(Nix is a pathway to many abilities some consider to be [unnatural](https://determinate.systems/posts/nix-direnv/); consider continuing your journey to [enlightenment](https://nixos.wiki/wiki/Flakes) on your own time.)

We have forked rCTF and rCDS to better suit our needs; the version of `rcds` PyPI provides is **not** correct, and you must build it from [source](https://github.com/sigpwny/rcds) ([flake.nix](flake.nix) takes care of this for you if you use Nix).

### Container runtime
In addition to requiring Docker to build container images, `rCDS` also needs access to a container runtime.
If you are on WSL, you should start the Docker daemon using Docker Desktop **for Windows**, which should expose the Docker socket to WSL if configured correctly.
If you are on macOS, you can either use Docker Desktop or `colima start` (although you probably need to set `DOCKER_HOST` if you use the latter, see [below](#rcds)).
Linux users should have no problem running Docker, but please note "exotic" setups like rootless Docker or Podman are untested.

### Setup
Run these commands to allow `terraform`, `docker`, and `kubectl` to authenticate with GCP:
```sh
$ gcloud init
$ gcloud auth login
$ gcloud auth application-default login
$ gcloud container clusters get-credentials <GCP PROJECT ID> --zone us-central1-a
$ gcloud auth configure-docker us-central1-docker.pkg.dev
```

Run these commands to ensure `terraform` works:
```sh
$ terraform init
$ terraform plan
```

Run this command to ensure `kubectl` is properly configured:
```sh
$ kubectl get pods -n rctf
NAME                        READY   STATUS    RESTARTS   AGE
frontend-7c46888776-dldjg   1/1     Running   0          178m
frontend-7c46888776-jp2jn   1/1     Running   0          178m
leaderboard-0               1/1     Running   0          178m
```

### Useful commands
Do not run these commands without understanding what they do (ask if you're unsure).
Many of these are examples and you will need to adapt them to your usecase.
```sh
$ terraform apply # push changes, only modifies remote resources managed by TF

$ kubectl apply -f ./k8s.yaml
$ kubectl exec -n rctf -it pods/frontend-7c46888776-wksmq /bin/sh # pop a shell
$ kubectl attach -n rctf pods/frontend-7c46888776-wksmq # get stdout of pod
$ kubectl logs -n traefik deployments/traefik
$ kubectl create secret tls "tls-cert-chal" --cert "certificates/fullchain.pem" --key "certificates/privkey.pem" # upload cert to cluster
$ kubectl apply -f ./errata/kubernetes-crd-definition-v1.yml # apply traefik crd

$ gcloud compute ssh redis # pop a shell on GCE instance
```

Deploy challenges using `rCDS` (please be mindful of what challenges you're deploying):
```sh
$ rcds deploy
Loading project at .../uiuctf-2024/challenges
Initializing backends
Loading challenges
testchal-simple: checking container main
Commiting container backend
PATCH Namespace rcds-testchal-simple
PATCH Deployment rcds-testchal-simple/main
PATCH Service rcds-testchal-simple/main
PATCH NetworkPolicy rcds-testchal-simple/network-policy-private
PATCH IngressRouteTCP rcds-testchal-simple/main
WARN: no scoreboard backend, skipping...
```

Get a certificate from Let's Encrypt and upload to the Kubernetes cluster:
```sh
$ certbot certonly --preferred-challenges dns --manual -d "rctf.2024.uiuc.tf" # may need sudo
...
will ask you to create a TXT record using your DNS provider
...
$ sudo kubectl create secret tls "tls-cert-rctf" --cert "/etc/letsencrypt/live/rctf.2024.uiuc.tf/fullchain.pem" --key "/etc/letsencrypt/live/rctf.2024.uiuc.tf"
```

### Adding an admin 
TODO

### Setting up rCTF challenge upload with GCP
<!-- +    local = { -->
<!-- +      source = "hashicorp/local" -->
<!-- +      version = "2.5.1" -->
<!-- +    } -->
<!-- # resource "local_file" "myaccountjson" { -->
<!-- #   content     = base64decode(google_service_account_key.chal-uploads.private_key) -->
<!-- #   filename = "/Users/ghuebner/Downloads/buckets-external-access-identity-sa.json" -->
<!-- # } -->

## Common errors
### Terraform
```sh
$ terraform init

Initializing the backend...
╷
│ Error: storage.NewClient() failed: dialing: google: could not find default credentials. See https://cloud.google.com/docs/authentication/external/set-up-adc for more information
```
Fix: `gcloud auth application-default login`. You obviously have to auth with a Google account that has access to the GCP project, so ask in infra chat if you need access.

```sh
$ terraform plan
...
Plan: 0 to add, 0 to change, 6 to destroy.
```
Fix: You are almost certainly on the wrong branch, pull from remote and check infra chat and other branches.
(Probably not the end of the world if you destroy these resources, whoever made them can probably reapply them. If you delete a database, that's the other person's fault for not adding deletion protection).

### Kubernetes
```sh
$ kubectl config current-context 
gke_<GCP PROJECT ID>
```
Fix: If the output above seems incorrect, `kubectl config set-context <infra-context>`.

### Nix
```sh
error: experimental Nix feature 'nix-command' is disabled; use '--extra-experimental-features nix-command' to override

error: experimental Nix feature 'flakes' is disabled; use '--extra-experimental-features flakes' to override
```
Fix: `nix develop --extra-experimental-features "nix-command flakes"` or add the line `experimental-features = nix-command flakes` to `/etc/nix/nix.conf`.

```sh
warning: Git tree '.../uiuctf-2024' is dirty
error: flake 'git+file:///.../uiuctf-2024' does not provide attribute 'packages.aarch64-darwin.default' or 'defaultPackage.aarch64-darwin'
```
Fix: You ran `nix build` or `nix shell`, but you probably want `nix develop`.

### Git
```sh
error: cannot feed the input to external filter "git-crypt" clean
error: external filter "git-crypt" clean failed -1
error: external filter "git-crypt" clean failed
```
Fix: Install `git-crypt`.

```sh
$ head certificates/fullchain.pem -n 1
GITCRYPT
```
Fix: `git-crypt unlock errata/git-crypt-key`

#### Submodules
- *`repos/` is empty*. You didn't `git clone --recurse-submodules`; if you already cloned, you can simply run `git submodule update --init`.
- *I'm on the wrong revision!* `git fetch` does __not__ fetch submodules; make sure to run `git submodule update` after a pull.
- *I updated, but I'm still on an old revision.* `git submodule update` updates to the revision tracked in the parent repo, which might be old. Run `git submodule update --remote` and commit the new revision (if it ought be updated).
- *Help! My work is gone!* Updating the submodule puts you in detached head state, just `git switch` back to your working copy (may require digging around with `git reflog`).

### rCDS
**NOTE:** We use a fork of rCDS that updates dependencies and patches behaviour for ingresses. __Do not__ `pip install rcds`, either use the provided Nix flake or clone the repo and build rCDS yourself.

```sh
  File ".../lib/python3.11/site-packages/docker/errors.py", line 39, in create_api_error_from_http_exception
    raise cls(e, response=response, explanation=explanation) from e
docker.errors.APIError: 500 Server Error for http+docker://localhost/v1.43/distribution/us-central1-docker.pkg.dev/<GCP PROJECT ID>/chal-artifact-registry/rcds-testchal-simple-main:322360deb38396c89aa9acd6bb0873298702ca0db9886441ddd48ac907acb518/json: Internal Server Error ("Head "https://us-central1-docker.pkg.dev/v2/<GCP PROJECT ID>/chal-artifact-registry/rcds-testchal-simple-main/manifests/322360deb38396c89aa9acd6bb0873298702ca0db9886441ddd48ac907acb518": denied: Unauthenticated request. Unauthenticated requests do not have permission "artifactregistry.repositories.downloadArtifacts" on resource "projects/<GCP PROJECT ID>/locations/us-central1/repositories/chal-artifact-registry" (or it may not exist)")
```
Fix: `gcloud auth configure-docker us-central1-docker.pkg.dev`

```sh
  File ".../lib/python3.11/site-packages/docker/api/client.py", line 220, in _retrieve_server_version
    raise DockerException(
docker.errors.DockerException: Error while fetching server API version: ('Connection aborted.', FileNotFoundError(2, 'No such file or directory'))
```
Fix: The Docker socket can't be found: run `dockerd` or `colima start`. If you're using Colima, also run `export DOCKER_HOST=$(docker context inspect $(docker context show) | awk -F '"' '/"Host"/ {print $4}')` as the socket is at a nonstandard location.

```sh
  File "/nix/store/0hhzvkw889bsybhqxy12ky4jx6a95p2d-python3-3.11.9/lib/python3.11/pathlib.py", line 1013, in stat
    return os.stat(self, follow_symlinks=follow_symlinks)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
PermissionError: [Errno 13] Permission denied: '/mnt/c/DumpStack.log.tmp'
```
Fix: This is probably an issue with WSL/Windows filesystem being wonky. Please ensure you are only working under your Linux home directory and not somewhere in `/mnt/c/` (__this includes where you run `nix develop`__); not only can this cause permissions errors like the above, but it's also plain [slower](https://github.com/microsoft/WSL/issues/4197).

## Challenges
```sh
$ nc <chal-name>.chal.uiuc.tf 1337
<hangs indefinitely...>
```
Fix: Use `ncat --ssl` instead of `nc` (former is part of the `nmap` package), or alternatively use `socat - OPENSSL:<chal-name>.chal.uiuc.tf:1337`.

## Misc (historical)
```sh
$ redis-cli -h redis.rctf.svc.cluster.local
redis.rctf.svc.cluster.local:6379> CLIENT ID
(error) ERR unknown command 'CLIENT', with args beginning with: 'ID' 
```
Fix: Google Memorystore [blacklists](https://cloud.google.com/memorystore/docs/redis/product-constraints) several common Redis commands. We fixed this by self-hosting Redis on a compute instance (see [main.tf](https://github.com/sigpwny/uiuctf-2024-infra/blob/5c68546a063d3ebdf8d7955d5f16d339476baa8d/terraform/main.tf#L296-L409)).

```sh
$ terraform refresh
...
╷
│ Warning: Empty or non-existent state
│ 
│ There are currently no remote objects tracked in the state, so there is nothing to refresh.
╵
```
Fix: There is an issue with the Terraform backend (how server-side Terraform state is managed and shared with all collaborators), and this is quite bad. Try to recover the Terraform `.tfstate` from the GCP bucket it's stored in (or in the more likely case a backend hasn't been setup yet, [set it up!](https://cloud.google.com/docs/terraform/resource-management/store-state)).
