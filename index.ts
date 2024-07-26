import * as gh from '@pulumi/github';
import { PrivateRepo, PublicRepo } from './components';

const integrationIds = {
	github: 15368,
};

const pki = new PrivateRepo('pki', {
	description: 'My private key infrastructure',
}, { protect: true });

const hosts = new PublicRepo('hosts', {
	description: 'My on-prem server infrastructure',
	requiredChecks: gh.getRepositoryFileOutput({
		file: 'hosts.txt',
		repository: 'UnstoppableMango/hosts',
	}).apply(file => {
		return file.content.trim().split('\n')
			.filter(x => !['apollo', 'pik8s0a'].includes(x))
			.map(x => ({
				context: `pulumi (${x})`,
				integrationId: integrationIds.github,
			}));
	}),
});

const johnstonDems = new PrivateRepo('johnston-dems-mailer', {
	description: 'Johnston Democrats mailing application',
});

const pulumiBun = new PublicRepo('pulumi-bun', {
	description: 'Experimental Pulumi support for Bun',
});

const pulumiBaremetal = new PublicRepo('pulumi-baremetal', {
	description: 'Pulumi provider for provisioning baremetal hosts',
	template: { owner: 'pulumi', repository: 'pulumi-provider-boilerplate' },
});

export const repos = [
	pki.repo.name,
	hosts.repo.name,
	johnstonDems.repo.name,
	pulumiBun.repo.name,
	pulumiBaremetal.repo.name,
];
