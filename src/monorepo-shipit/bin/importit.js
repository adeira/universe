#!/usr/bin/env node

// @flow

import { invariant } from '@adeira/js';
import { program as commander } from 'commander';

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createImportSyncPhase from '../src/phases/createImportSyncPhase';
import type { Phase } from '../types.flow';

// TODO: check we can actually import this package (whether we have config for it)
// yarn monorepo-babel-node src/monorepo-shipit/bin/importit.js --help
// yarn monorepo-babel-node src/monorepo-shipit/bin/importit.js --committer-name=A --committer-email=B --pull-request=https://github.com/adeira/universe/pull/1

type ImportitCLIType = {
  +configFilter: string,
  +configDir: string,
  +committerName: string,
  +committerEmail: string,
  +pullRequest: string,
};

commander
  .version(require('./../package.json').version)
  .description('Import pull request into your monorepo.')
  .requiredOption('--config-filter <glob>', 'Glob pattern to filter config files', '/*.js')
  .requiredOption('--config-dir <path>', 'Path to the directory with config files', './.shipit')
  .requiredOption('--committer-name <name>', 'Name of the committer')
  .requiredOption('--committer-email <email>', 'Email of the committer')
  .requiredOption('--pull-request <url>', 'URL of the pull request to import');

commander.parse();
const options: ImportitCLIType = commander.opts();

function parseGitHubPRUrl(url: string): { +packageName: string, +prNumber: string } {
  const urlPattern =
    /^https:\/\/github\.com\/(?<org>[A-Za-z0-9_.-]+)\/(?<repo>[A-Za-z0-9_.-]+)\/pull\/(?<prNumber>\d+)$/;

  const match = url.match(urlPattern);

  if (match) {
    invariant(match.groups?.org != null, 'Invalid GitHub PR URL (cannot determine org)');
    invariant(match.groups.repo != null, 'Invalid GitHub PR URL (cannot determine repo)');
    invariant(match.groups.prNumber != null, 'Invalid GitHub PR URL (cannot determine PR number)');

    return {
      packageName: `${match.groups.org}/${match.groups.repo}`,
      prNumber: match.groups.prNumber,
    };
  }
  throw new Error(
    'Invalid GitHub PR URL. We currently support imports only from GitHub.com - please open an issue to add a support for additional providers.',
  );
}

process.env.SHIPIT_COMMITTER_EMAIL = options.committerEmail;
process.env.SHIPIT_COMMITTER_NAME = options.committerName;

const parsedURL = parseGitHubPRUrl(options.pullRequest);
const repoURL = `git@github.com:${parsedURL.packageName}.git`;

iterateConfigs(options, (config) => {
  if (config.exportedRepoURL === repoURL) {
    new Set<Phase>([
      createClonePhase(config.exportedRepoURL, config.destinationPath),
      createCheckCorruptedRepoPhase(config.destinationPath),
      createCleanPhase(config.destinationPath),
      createImportSyncPhase(config, parsedURL.packageName, parsedURL.prNumber),
    ]).forEach((phase) => phase());
  }
});
