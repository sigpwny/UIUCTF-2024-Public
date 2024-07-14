# Challenges
Flag format: `uiuctf{...}`.
Maybe add a random string at the end of your flag, especially if it's short.

## Style guidelines
- Use `.yaml` instead of `.yml`. The difference doesn't matter to rCDS, but you will make the baby Jesus cry otherwise.
- Don't include an `**author**:` line in `challenge.yaml`.
- Author names and challenges should be capitalized by default for consistency; it's fine to make them lowercase if you want, but this should be an intentional deviation from the norm for stylistic/practical purposes.
- Category names (crypto, pwn) should always be *lowercase*.
You can name your challenge whatever and go by whatever name you want, but be cognizant that most people will capitalize their names and challenges; as long as you are knowingly making stuff lowercase that's fine (all challenge URIs are lowercase).
- Prepend relative paths with `./` for clarity.

## For Challenge Devs: Adding a Challenge
- `cd` into `/challenges/<category>`
- Create the following directory structure:
``` 
<category>
└── <challenge name>
    ├── README.md
    ├── <solve script>
    ├── <writeup, optional (for now)>
    ├── challenge
    │   ├── Dockerfile
    │   ├── flag.txt
    │   └── <challenge files>
    ├── challenge.yml
    └── healthcheck
        ├── README.md
        ├── Dockerfile
        ├── healthcheck.py
        ├── healthcheck_loop.sh
        └── healthz_webserver.py
```
- If your challenge *does not* require a container (e.g. rev), you don't have to create a Dockerfile.
- Your challenge folder **MUST** have a `challenge.yaml` file for rCDS, following the specification [here](https://rcds.redpwn.net/en/latest/challenge/#containers). Check existing challenges for examples.
- If your challenge presents a shell to a participant (or any other way of accessing/modifying global OS-wide state), you should use [`nsjail`](https://nsjail.dev/). To do this, create an nsjail config (`nsjail.cfg`) and write your `Dockerfile` to run the challenge with nsjail (look [here](https://github.com/sigpwny/uiuctf-2024-chal-repo/tree/main/challenges/pwn/lost_canary/challenge) for an example of how to do this, including a sample `nsjail` config).
- Every challenge needs a writeup written in a markup language (a brief description of your solve script is adequate).
- The flag format is `uiuctf{[a-zA-Z0-9_]+}`.

### Healthcheck
In addition to the container running the challenge, each (hosted) challenge must also have a healthcheck container; this container exposes `http://<chal-name>.chal.uiuc.tf:45281/healthz`, which returns 200 OK or anything else for an error (different status codes can be configured to mean different things).

The default healthcheck consists of:
* a loop that repeatedly calls a python script and writes the status to a file
* a webserver that checks the file and serves /healthz
* the actual healthcheck code using pwntools for convenience

To modify it, you will likely only have to change the script in [healthcheck.py](challenges/misc/testchal/healthcheck/healthcheck.py).
You should use your solve script to ensure the challenge behaves as intended on remote; the script should finish with exit code 0 if everything is working as expected.

## For Challenge Testers: Testing locally
Checkout a PR with `git fetch origin pull/<n>/head` and then `git checkout` the remote branch you just pulled.
`cd` into the `challenge` subdirectory of the challenge you'd like to test (the one actually containing the code), and run `docker run -p 1337:1337 $(docker build -q .)` or similar to spin up a container.
Connect using `nc localhost 1337` (note that local containers do *not* use SSL, so don't use `ncat --ssl` to connect) and test the challenge!

From a QA perspective, try the challenge without looking at the solve first so you can also give feedback on difficulty (and so you're not heavily biased towards the intended solve).

## Local dev

```
docker:
  image:
    prefix: "localhost:5000"
backends:
- resolve: rctf
  options:
    url: 'http://localhost:8080'
    token: 'XXXX'

```

https://stackoverflow.com/questions/77490435/attributeerror-cython-sources
```
echo "cython<3" > /tmp/constraint.txt
PIP_CONSTRAINT=/tmp/constraint.txt pip install -r requirements.txt
```

https://github.com/docker/docker-py/issues/3113#issuecomment-1531621678

```
pip3 remove requests
pip3 install requests=2.28.1
```

https://stackoverflow.com/questions/77490435/attributeerror-cython-sources
Set the admin bit in postgres. Copy the admin token by decoding the URL in rCTF profile page. Set the token in `rdcs.yaml` to the admin token. Set the prefix in `rdcs.yaml` to `localhost:8080`.
Spin up registry `docker run -d -p 5000:5000 --name registry registry:2.7` and set prefix in `rdcs.yaml` to `localhost:5000`.

Finally, from the challenges directory run

```bash
rcds deploy
# sudo /home/retep/.pyenv/shims/rcds deploy
```

It may look like

```
docker ps
CONTAINER ID   IMAGE                                                       COMMAND                  CREATED         STATUS         PORTS                      NAMES
f07019ebb660   us-central1-docker.pkg.dev/.../rctf/rctf   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   127.0.0.1:8080->80/tcp     rctf-rctf-1
e58ac4b2b9bd   redis:6.0.6                                                 "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   6379/tcp                   rctf-redis-1
69affe3756f6   postgres:12.3                                               "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   127.0.0.1:5432->5432/tcp   rctf-postgres-1
87b367381483   registry:2.7                                                "/entrypoint.sh /etc…"   21 hours ago    Up 21 hours    0.0.0.0:5000->5000/tcp     registry
```

Token in `/opt/rctf/.env` for postgres.

```
psql -h 127.0.0.1 -p 5432 --user rctf

UPDATE users SET perms=3 WHERE name='admin';
```
