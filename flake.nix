{
  description = "Awww shit, here we go again";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    rcds.url = "github:sigpwny/rcds";
    rctf = {
      url = "github:redpwn/rctf";
      flake = false;
    };
    traefik = {
      url = "github:traefik/traefik";
      flake = false;
    };
  };

  outputs = inputs@{ self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in {
        apps.get_key = {
          type = "app";
          program = (pkgs.writeShellScriptBin "get_key" ''
            head -c 32 /dev/urandom | base64 -w 0
          '') + "/bin/get_key";
        };
        devShells.default = with pkgs; mkShellNoCC {
          packages = [
            terraform
            colima
            docker docker-compose
            kubectl
            (google-cloud-sdk.withExtraComponents( with google-cloud-sdk.components; [
              gke-gcloud-auth-plugin
            ]))
            postgresql
            nmap
            certbot
            git-crypt
            inputs.rcds.packages.${system}.rcds
            (python311.withPackages(ps: with ps; [
              pwntools
            ]))
          ];
          # not used, useful for debugging though
          RCTF_INSTALLER = (inputs.rctf + "/install/install.sh");
          COMPOSE_FILE = (inputs.rctf + "/docker-compose.yml");
          DOCKER_FILE = (inputs.rctf + "/Dockerfile");
          TRAEFIK_DEF = (inputs.traefik + "/docs/content/reference/dynamic-configuration/kubernetes-crd-definition-v1.yml");
        };
      });
}
