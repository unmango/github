import * as gh from '@pulumi/github';
import { Config, output } from '@pulumi/pulumi';
import * as allRepos from './repos';
import { terraformProviderAtproto, terraformProviderNetgear } from './repos';

// The Terraform Registry checks provider releases against every key registered on
// the namespace, so one key signs them all. The registry accepts RSA and DSA keys only.
const config = new Config();
const providerRepos = [terraformProviderAtproto, terraformProviderNetgear];
const releaseSigningSecrets = {
	GPG_PRIVATE_KEY: config.requireSecret('releaseGpgPrivateKey'),
	PASSPHRASE: config.requireSecret('releaseGpgPassphrase'),
};
for (const [secretName, plaintextValue] of Object.entries(releaseSigningSecrets)) {
	new gh.ActionsOrganizationSecret(secretName, {
		secretName,
		plaintextValue,
		visibility: 'selected',
		selectedRepositoryIds: providerRepos.map(x => x.repo.repoId),
	});
}

export const repos = output(Object.values(allRepos).map(x => x.repo.name)).apply(names => [...names].sort());
