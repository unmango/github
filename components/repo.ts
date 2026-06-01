import * as gh from '@pulumi/github';
import { ComponentResource, ComponentResourceOptions } from '@pulumi/pulumi';

export interface RepoArgs {
	overrides: Partial<gh.RepositoryArgs>;
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
		}, { parent: this });

		const vulnerabilityAlerts = new gh.RepositoryVulnerabilityAlerts(name, {
			repository: repo.name,
		}, { parent: this });

		this.repo = repo;
		this.vulnerabilityAlerts = vulnerabilityAlerts;
	}
}
