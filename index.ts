import { PublicRepo } from './components';

const actions = new PublicRepo('actions', {
	description: 'Shared GitHub Actions',
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
	githubChecks: ['Run on Ubuntu'], // TODO: I kinda hate this
	pages: {
		buildType: 'legacy',
		cname: '',
		source: {
			branch: 'gh-pages',
			path: '/',
		},
	},
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
	devctl.repo.name,
	game.repo.name,
	go.repo.name,
	goMake.repo.name,
	goPrivateInternetAccess.repo.name,
	goGmk.repo.name,
	kubepkgs.repo.name,
	kubebuilder.repo.name,
	pkgs.repo.name,
	protofs.repo.name,
	pulumiBaremetal.repo.name,
	pulumipkgs.repo.name,
	thecluster.repo.name,
	theclusterOperator.repo.name,
];
