import { PublicRepo } from './components';

const pulumiBaremetal = new PublicRepo('pulumi-baremetal', {
	description: 'Pulumi bare-metal provisioning provider',
	template: { owner: 'pulumi', repository: 'pulumi-provider-boilerplate' },
	githubChecks: ['Provisioner', 'Provider', 'Tests'],
});

const go = new PublicRepo('go', {
	description: 'Random Go crap',
	githubChecks: ['Build and Test'],
});

const thecluster = new PublicRepo('thecluster', {
	description: 'DevOps tooling for managing a Kubernetes cluster with Pulumi micro-stacks',
	githubChecks: ['Build and Test'],
});

const theclusterOperator = new PublicRepo('thecluster-operator', {
	description: 'Smörgåsbord of things a person might want running in their Kubernetes cluster',
	githubChecks: ['Build and Test'],
});

export const repos = [
	pulumiBaremetal.repo.name,
	go.repo.name,
	thecluster.repo.name,
	theclusterOperator.repo.name,
];
