# unmango/github

GitHub organization configuration as code. Repositories, branch protection, and settings managed via [Pulumi](https://www.pulumi.com/).

## What is this?

This repository replaces manual GitHub UI configuration with declarative TypeScript. Rather than configuring repositories through the GitHub UI, settings are version-controlled, reviewed via pull request, and applied programmatically.

**Pulumi** is an infrastructure-as-code tool that lets you describe infrastructure (GitHub repos, AWS resources, Kubernetes clusters, etc.) using real programming languages instead of domain-specific configuration languages like HCL. It tracks deployed state and computes diffs between desired and actual configuration, the same mental model as `kubectl apply` or `terraform plan/apply`.

## What's managed here

Every public repository under [@unmango](https://github.com/unmango) is defined in [`index.ts`](./index.ts). Each repo gets:

- **Branch protection** on `main`: required PRs, stale review dismissal, required status checks, commit signatures, linear history
- **Consistent merge settings**: squash-only, delete branch on merge, no auto-merge
- **MIT license** and vulnerability alerts enabled by default

Private repos use a minimal configuration without branch rulesets.

## Structure

```
index.ts              # All repos declared here
components/
  repo.ts             # Base class: shared defaults for all repos
  publicRepo.ts       # Adds branch ruleset enforcement
  privateRepo.ts      # Private visibility, no rulesets
```

`PublicRepo` and `PrivateRepo` extend a shared base component. Adding a new repo means instantiating one of these classes with a name, description, and the CI check names that must pass before merging.

## Usage

```bash
make preview   # Dry run — see what would change
make diff      # Detailed diff of pending changes
make up        # Apply changes to GitHub
```
