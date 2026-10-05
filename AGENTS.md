# AGENTS.md

This file provides guidance to AI agents when working with code in this repository.

## Overview

This repository manages GitHub organization infrastructure for "unmango" using Pulumi (TypeScript). It defines repositories, branch protection rulesets, and GitHub settings as code.

## Commands

```bash
make install     # Install dependencies and select prod stack
make lint        # Run ESLint (yarn lint)
make fmt         # Format code with dprint and nixfmt
make preview     # Preview Pulumi changes (dry run)
make diff        # Show detailed diff of changes
make up          # Deploy changes to prod stack
make refresh     # Refresh stack state from GitHub
```

Formatting uses **dprint** (not prettier) — run `make fmt` before committing.

## Architecture

### Component Hierarchy

```
Repo (abstract base)
├── PublicRepo   — public repos with branch rulesets and optional Pages
└── PrivateRepo  — private repos, no rulesets
```

**`github/components/repo.ts`** — Base class: sets defaults (squash-only merging, no auto-merge, delete branch on merge, MIT license).

**`github/components/publicRepo.ts`** — Adds a `main` branch ruleset enforcing: required PRs, stale review dismissal, required status checks (mapped to GitHub integration ID `15368`), required signatures, linear history, no fast-forward.

**`github/components/privateRepo.ts`** — Minimal: just the base Repo with private visibility.

**`index.ts`** — Entrypoint; re-exports each forge's program, such as `./github`.

**`github/repos.ts`** — Instantiates all managed repos as `PublicRepo` or `PrivateRepo` with their specific status check names, one exported const each.

**`github/index.ts`** — Organization-level resources (Actions secrets) and the `repos` stack output, derived from every export of `repos.ts`.

### Authentication

Uses GitHub App credentials stored in Pulumi config (`Pulumi.prod.yaml`): app ID `1264044`, installation ID `66536645`.

### Stack

Single stack: `UnstoppableMango/unmango-github/prod`
