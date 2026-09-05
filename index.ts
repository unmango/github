import { PublicRepo } from './components';

const actions = new PublicRepo('actions', {
	description: 'Blessed GitHub Actions',
	githubChecks: ['check'],
});

const aferox = new PublicRepo('aferox', {
	description: 'Implementations and utilities for github.com/spf13/afero',
	githubChecks: ['Build and Test'],
});

const apis = new PublicRepo('apis', {
	description: 'Public API definitions',
	topics: ['api', 'protobuf', 'grpc', 'openapi'],
	githubChecks: ['check'],
});

const charts = new PublicRepo('charts', {
	description: 'Smörgåsbord of Helm charts',
	githubChecks: ['lint'],
	pages: {
		buildType: 'legacy',
		cname: '',
		source: {
			branch: 'gh-pages',
			path: '/',
		},
	},
});

const cloudflareOperator = new PublicRepo('cloudflare-operator', {
	description: 'Manage Cloudflare infrastructure in Kubernetes',
	githubChecks: ['build', 'lint', 'test'],
	pages: {
		buildType: 'legacy',
		cname: '',
		source: {
			branch: 'gh-pages',
			path: '/',
		},
	},
});

const containers = new PublicRepo('containers', {
	description: 'Smörgåsbord of OCI containers',
	topics: ['docker', 'oci', 'containers', 'ghcr', 'container-registry'],
	githubChecks: ['build'],
});

const devctl = new PublicRepo('devctl', {
	description: 'Dev productivity CLI',
	githubChecks: ['build'],
});

const game = new PublicRepo('game', {
	description: 'A gaming framework',
	githubChecks: ['Build and Test'],
});

const go = new PublicRepo('go', {
	description: 'Random Go crap',
	githubChecks: ['Build and Test'],
});

const goMake = new PublicRepo('go-make', {
	description: 'Makefile parsing library for Go',
	githubChecks: ['Build and Test'],
});

const goPrivateInternetAccess = new PublicRepo('go-pia', {
	description: 'Private Internet Access client and utilities in Go',
	githubChecks: ['Build and Test'],
});

// Keep the Pulumi resource name as "gnumake-go" to preserve URNs; the GitHub repo is renamed via repoName.
const goGmk = new PublicRepo('gnumake-go', {
	repoName: 'go-gmk',
	description: 'Go bindings for the GNU Make loadable object API',
	githubChecks: ['build'],
	topics: ['go', 'make', 'gnumake', 'cgo', 'plugin'],
});

const kubepkgs = new PublicRepo('kubepkgs', {
	description: 'Nix packaged Kubernetes components and utilities',
	githubChecks: ['build'],
});

const kubebuilder = new PublicRepo('kubebuilder', {
	description: 'Collection of kubebuilder plugins',
	githubChecks: ['build', 'lint', 'clean'],
});

const nix2git = new PublicRepo('nix2git', {
	description: 'Nix support for initializing and managing git repositories',
	topics: ['nix', 'git', 'nix-flake', 'home-manager'],
	githubChecks: ['check'],
	// Moved from gitlab.com/unmango/nix/2git, so the repository already exists.
	repoOptions: { import: 'nix2git' },
});

const protofs = new PublicRepo('protofs', {
	description: 'Protobuf definitions for filesystem abstractions',
	githubChecks: ['buf'],
});

const pulumiBaremetal = new PublicRepo('pulumi-baremetal', {
	description: 'Pulumi bare-metal provisioning provider',
	template: { owner: 'pulumi', repository: 'pulumi-provider-boilerplate' },
	githubChecks: ['Provisioner', 'Provider', 'Tests'],
});

const pulumipkgs = new PublicRepo('pulumipkgs', {
	description: 'Pulumi, providers, and plugins packaged for Nix',
	topics: ['nix', 'nixpkgs', 'nix-flake', 'pulumi'],
	githubChecks: ['build'],
});

const pkgs = new PublicRepo('pkgs', {
	description: 'Mini nixpkgs — personal Nix package collection',
	topics: ['nix', 'nixpkgs', 'nix-flake'],
	githubChecks: ['build (x86_64-linux)'],
});

const terraform2crd = new PublicRepo('terraform2crd', {
	description: 'Converts Terraform provider code specs to Custom Resource Definitions (CRDs)',
	topics: ['terraform', 'crd', 'kubernetes', 'codegen'],
	// Moved from gitlab.com/unmango/terraform/2crd, so the repository already exists.
	repoOptions: { import: 'terraform2crd' },
});

// Registry-locked name, do not shorten.
const terraformProviderNetgear = new PublicRepo('terraform-provider-netgear', {
	description: 'Terraform provider for (some) NetGear devices',
	topics: ['terraform', 'opentofu', 'netgear', 'go'],
	githubChecks: ['build', 'codegen'],
	// Moved from gitlab.com/unmango/terraform/terraform-provider-netgear, so the
	// repository already exists.
	repoOptions: { import: 'terraform-provider-netgear' },
});

const thecluster = new PublicRepo('thecluster', {
	description: 'DevOps tooling for managing a Kubernetes cluster with Pulumi micro-stacks',
	githubChecks: ['Build and Test'],
});

const theclusterOperator = new PublicRepo('thecluster-operator', {
	description: 'Smörgåsbord of things a person might want running in their Kubernetes cluster',
	githubChecks: ['Build and Test', 'Lint', 'Docker'],
});

export const repos = [
	actions.repo.name,
	aferox.repo.name,
	apis.repo.name,
	charts.repo.name,
	cloudflareOperator.repo.name,
	containers.repo.name,
	devctl.repo.name,
	game.repo.name,
	go.repo.name,
	goMake.repo.name,
	goPrivateInternetAccess.repo.name,
	goGmk.repo.name,
	kubepkgs.repo.name,
	kubebuilder.repo.name,
	nix2git.repo.name,
	pkgs.repo.name,
	protofs.repo.name,
	pulumiBaremetal.repo.name,
	pulumipkgs.repo.name,
	terraform2crd.repo.name,
	terraformProviderNetgear.repo.name,
	thecluster.repo.name,
	theclusterOperator.repo.name,
];
