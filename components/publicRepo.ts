import * as gh from '@pulumi/github';
import {
	RepositoryRulesetRules,
	RepositoryRulesetRulesRequiredStatusChecks,
	RepositoryTemplate,
	RepositoryPages,
} from '@pulumi/github/types/input';
import { ComponentResourceOptions, Input, output } from '@pulumi/pulumi';
import { Repo } from './repo';

const integrationIds = {
	github: 15368,
};

export interface PublicRepoArgs {
	description: Input<string>;
	githubChecks?: Input<Input<string>[]>;
	requiredChecks?: RepositoryRulesetRulesRequiredStatusChecks['requiredChecks'];
	template?: RepositoryTemplate;
	pages?: RepositoryPages;
}

export class PublicRepo extends Repo {
	public readonly mainRuleset: gh.RepositoryRuleset;

	constructor(
		name: string,
		args: PublicRepoArgs,
		opts?: ComponentResourceOptions,
	) {
		super(
			'unmango:github:PublicRepo',
			name,
			{
				overrides: {
					name,
					description: args.description,
					visibility: 'public',
					allowAutoMerge: true,
					template: args.template,
					vulnerabilityAlerts: true,
					pages: args.pages,
				},
			},
			opts,
		);

		const repo = this.repo;
		const statusChecks = args.githubChecks
			? getGitHubStatusChecks(args.githubChecks)
			: getRequiredStatusChecks(args.requiredChecks);

		const mainRuleset = new gh.RepositoryRuleset(
			name,
			{
				name: 'main',
				repository: repo.name,
				enforcement: 'active',
				target: 'branch',
				conditions: {
					refName: {
						includes: ['~DEFAULT_BRANCH'],
						excludes: [],
					},
				},
				rules: {
					deletion: true,
					pullRequest: {
						dismissStaleReviewsOnPush: true,
						requiredReviewThreadResolution: true,
					},
					nonFastForward: true,
					requiredLinearHistory: true,
					requiredSignatures: true,
					requiredStatusChecks: statusChecks,
				},
			},
			{ parent: this },
		);

		this.mainRuleset = mainRuleset;

		this.registerOutputs({
			repo,
			mainRuleset,
		});
	}
}

function getGitHubStatusChecks(
	checks: PublicRepoArgs['githubChecks'],
): RepositoryRulesetRules['requiredStatusChecks'] {
	if (!checks) return;

	return getRequiredStatusChecks(
		output(checks).apply(c =>
			c.map(x => ({
				integrationId: integrationIds.github,
				context: x,
			}))
		),
	);
}

function getRequiredStatusChecks(
	checks: PublicRepoArgs['requiredChecks'],
): RepositoryRulesetRules['requiredStatusChecks'] {
	if (!checks) return;

	return { requiredChecks: checks };
}
