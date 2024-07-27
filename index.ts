import * as gh from '@pulumi/github';
import { PrivateRepo, PublicRepo } from './components';

const integrationIds = {
	github: 15368,
};

const pulumiBaremetal = new PublicRepo('pulumi-baremetal', {
	description: 'Pulumi bare-metal provisioning provider',
	template: { owner: 'pulumi', repository: 'pulumi-provider-boilerplate' },
});

export const repos = [
	pulumiBaremetal.repo.name,
];
