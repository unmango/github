# enclave

Planned repo: `unmango/enclave`.

## Description

A Kubernetes operator for development environments inside a cluster.
An environment is a pod plus the state around it, either drawn from a warm pool kept ready ahead of demand or provisioned on request.
The pool exists so that claiming an environment costs a scheduling decision rather than a cold start.

## Name

An enclave is a self-contained territory inside a larger one, which is what a development environment is inside a cluster.
It reads well as a resource kind (`kind: Enclave`) and pluralizes into the warm pool (`EnclavePool`).
The word also refers to SGX-style confidential compute, so search results mix, but no Kubernetes or developer-environment project holds the name.
