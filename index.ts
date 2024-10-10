import { PublicRepo } from './components';

const pulumiBaremetal = new PublicRepo('pulumi-baremetal', {
	description: 'Pulumi bare-metal provisioning provider',
	template: { owner: 'pulumi', repository: 'pulumi-provider-boilerplate' },
	githubChecks: ['Provisioner', 'Provider', 'Tests'],
});

const go = new PublicRepo('go', {
	description: 'Monorepo for go modules',
	githubChecks: ['CI'],
});

export const repos = [
	pulumiBaremetal.repo.name,
	go.repo.name,
];
