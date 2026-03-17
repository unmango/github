{
  description = "unmango's GitHub configuration";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    systems.url = "github:nix-systems/default";
    flake-parts.url = "github:hercules-ci/flake-parts";

    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{ flake-parts, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import inputs.systems;
      imports = [ inputs.treefmt-nix.flakeModule ];

      perSystem =
        { pkgs, ... }:
        {
          devShells.default = pkgs.mkShellNoCC {
            packages = with pkgs; [
              dprint
              flake-checker
              gnumake
              nixfmt
              nodejs_24
              shellcheck
              pulumi-bin
              yarn
            ];

            DPRINT = pkgs.dprint + "/bin/dprint";
            FLAKE_CHECKER = pkgs.flake-checker + "/bin/flake-checker";
            NIXFMT = pkgs.nixfmt + "/bin/nixfmt";
            NODE = pkgs.nodejs_24 + "/bin/node";
            PULUMI = pkgs.pulumi-bin + "/bin/pulumi";
            YARN = pkgs.yarn + "/bin/yarn";

            FLAKE_CHECKER_NO_TELEMETRY = "true";
          };

          treefmt = {
            projectRootFile = "flake.nix";
            programs.nixfmt.enable = true;
            # programs.dprint.enable = true;
          };
        };
    };
}
