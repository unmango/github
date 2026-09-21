# kubebuilder-nix

Planned repo: `unmango/kubebuilder-nix`.

## Description

Nix builders for Kubebuilder project scaffolds.
`kubebuilder alpha generate` rebuilds a project from its `PROJECT` file, and `kubebuilder alpha update` merges user code between scaffolds from two Kubebuilder versions.
Each scaffold depends only on the Kubebuilder version, `PROJECT`, and the boilerplate header, so it can be a derivation.
The repo exposes a library and a flake-parts module that build scaffolds per version and per plugin layer, and an app that runs the three-way upgrade merge against pinned binaries.

## Name

It follows the `<tool>-nix` pattern, and sits next to `unmango/kubebuilder`, which holds Kubebuilder plugins written in Go.
