# terraform-backend-sops

Planned repo: `unmango/terraform-backend-sops`.

## Description

sops-encrypted state for OpenTofu and Terraform, where the encryption is the product and the storage is a detail.
Recipients are age, PGP, or KMS, and several at once, so an operator and a CI job each hold their own key instead of sharing one passphrase.
State can sit in a git repo, on local disk, or in object storage, chosen per state rather than fixed by the tool.

## Name

It follows the `terraform-backend-*` convention that `terraform-backend-git` established, which is how anyone looking for one of these finds it.
The `terraform` in the name is the ecosystem's word for the HTTP backend protocol, not a claim that the tool shells out to a binary called `terraform`.
The name is unclaimed; the only near match is `isleofbeans/terraform-sops-backend`, at zero stars and a different word order.

## Prior art

Three existing approaches each solve part of the problem, and the gaps between them are the reason to build this.

`plumber-cd/terraform-backend-git` stores state in a git repo and encrypts it with sops, multiple age recipients included.
Locking works by pushing a `locks/*` branch, since creating a branch is atomic.
Two things make it awkward.
The wrapper hardcodes the binary name `terraform`, so OpenTofu needs a shim on `$PATH` to be invoked at all.
And because `plan` takes a lock by default, a CI job that only plans needs push access to the state repo rather than just a decrypt key.

`nimbolus/terraform-backend` is a standalone HTTP backend server with pluggable storage (local, S3, Postgres), locking (local, Redis, Postgres), and encryption (local AES key, Vault KV, Vault Transit).
The plugin shape is the right one and the separation of locking from storage is the part worth keeping.
It has no git storage and no sops, so there is no way to give an operator and CI separate keys.

OpenTofu's native state encryption (1.7+) needs no server and no wrapper, and it covers plan files as well as state.
Its key providers are PBKDF2, AWS KMS, GCP KMS, Azure Key Vault, OpenBao, and an experimental external one.
None of them is sops, so adopting it means trading the multi-recipient model for a single shared passphrase.

## Design

One binary with two entry points, because the encryption problem and the locking problem do not need the same solution.

### External key provider

OpenTofu's experimental `key_provider "external"` runs a program and reads a key from its stdout.
The protocol is small: the program announces `{"magic":"OpenTofu-External-Key-Provider","version":1}`, receives `{"external_data":{...}}` or `null` on stdin, and returns an encryption key, a decryption key, and metadata to be stored alongside the state.
That metadata is enough to carry a sops data key wrapped for several age recipients, with each holder unwrapping using their own identity.
This mode runs no daemon and wraps no CLI, so the hardcoded binary name stops being a problem instead of being worked around, and plan files are encrypted for free.
It is OpenTofu only, and the interface is marked experimental.

### HTTP backend server

For locking, for shared state, or for Terraform proper, the same binary serves the HTTP backend protocol.
Storage, locking, and recipients are separate pluggable interfaces, following `nimbolus/terraform-backend`'s shape, with git storage and sops encryption added.
The backend is addressed by URL, so nothing wraps the CLI and `tofu` and `terraform` are equally fine.

### Locking that a plan-only job can use

Coupling the lock to a branch push is what forces `terraform-backend-git` to demand push rights from a CI job that only plans.
Keeping the lock backend separate from the storage backend avoids that.
Git storage can pair with a lock backend the CI job reaches with a narrower credential, and a single-operator state can decline locking outright.

## Open questions

Whether `external_data` can hold a full sops envelope for several recipients, or whether the envelope lives beside the state with only a reference in the metadata.

Whether to consume sops as a library or shell out to the binary.
The library keeps recipients and key groups first-class.
Shelling out keeps the on-disk format byte-identical to what `sops` itself writes, which matters for `sops updatekeys` and for rotating a recipient out.

Whether the two entry points should share a state format at all, so that a state written through the key provider can later be read through the server without a migration.
