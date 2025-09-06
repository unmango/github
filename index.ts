import { PublicRepo } from './components';

const aferox = new PublicRepo('aferox', {
	description: 'Implementations and utilities for github.com/spf13/afero',
	githubChecks: ['Build and Test'],
});

const charts = new PublicRepo('charts', {
	description: 'Smörgåsbord of Helm charts',
});

const cloudflareOperator = new PublicRepo('cloudflare-operator', {
	description: 'Manage Cloudflare infrastructure in Kubernetes',
	githubChecks: ['Run on Ubuntu'], // TODO: I kinda hate this
});

const devctl = new PublicRepo('devctl', {
	description: 'Dev productivity CLI',
	githubChecks: ['Build and Test'],
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

const gnumakeGo = new PublicRepo('gnumake-go', {
	description: 'Package gnumake provides Go bindings for GNU Make shared object loading',
	githubChecks: ['Build and Test'],
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

const thecluster = new PublicRepo('thecluster', {
	description: 'DevOps tooling for managing a Kubernetes cluster with Pulumi micro-stacks',
	githubChecks: ['Build and Test'],
});

const theclusterOperator = new PublicRepo('thecluster-operator', {
	description: 'Smörgåsbord of things a person might want running in their Kubernetes cluster',
	githubChecks: ['Build and Test', 'Lint', 'Docker'],
});

export const repos = [
	aferox.repo.name,
	cloudflareOperator.repo.name,
	devctl.repo.name,
	game.repo.name,
	go.repo.name,
	goMake.repo.name,
	goPrivateInternetAccess.repo.name,
	gnumakeGo.repo.name,
	kubebuilder.repo.name,
	protofs.repo.name,
	pulumiBaremetal.repo.name,
	thecluster.repo.name,
	theclusterOperator.repo.name,
];
