import { ComponentResourceOptions, Input } from '@pulumi/pulumi';
import { Repo } from './repo';

export interface PrivateRepoArgs {
	description: Input<string>;
}

export class PrivateRepo extends Repo {
	constructor(name: string, args: PrivateRepoArgs, opts?: ComponentResourceOptions) {
		super('unmango:github:PrivateRepo', name, {
			overrides: {
				name,
				description: args.description,
				visibility: 'private',
			},
		}, opts);

		const repo = this.repo;

		this.registerOutputs({ repo });
	}
}
