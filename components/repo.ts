import * as gh from '@pulumi/github';
import { ComponentResource, ComponentResourceOptions, CustomResourceOptions } from '@pulumi/pulumi';

export interface RepoArgs {
	overrides: Partial<gh.RepositoryArgs>;
	/**
	 * Options for the repository resource itself, on top of its parent. It is how
	 * a repository that already exists on GitHub is adopted: an import, or an
	 * alias for one whose URN is moving.
	 */
	repoOptions?: CustomResourceOptions;
}

export abstract class Repo extends ComponentResource {
	public readonly repo!: gh.Repository;
	public readonly vulnerabilityAlerts!: gh.RepositoryVulnerabilityAlerts;

	constructor(type: string, name: string, args: RepoArgs, opts?: ComponentResourceOptions) {
		super(type, name, args, opts);
		if (opts?.urn) return; // Refreshing

		const repo = new gh.Repository(name, {
			// I think this isn't allowed for private repos
			allowAutoMerge: false,
			allowMergeCommit: false,
			allowRebaseMerge: false,
			allowSquashMerge: true,
			deleteBranchOnMerge: true,
			hasDiscussions: false,
			hasIssues: true,
			hasProjects: false,
			hasWiki: false,
			licenseTemplate: 'mit',
			squashMergeCommitMessage: 'COMMIT_MESSAGES',
			squashMergeCommitTitle: 'COMMIT_OR_PR_TITLE',
			...args.overrides,
		}, { parent: this, ...args.repoOptions });

		const vulnerabilityAlerts = new gh.RepositoryVulnerabilityAlerts(name, {
			repository: repo.name,
		}, { parent: this });

		this.repo = repo;
		this.vulnerabilityAlerts = vulnerabilityAlerts;
	}
}
