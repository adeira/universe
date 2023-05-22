#!/usr/bin/env node

// @flow

import { invariant } from '@adeira/js';
import commandLineArgs from 'command-line-args';

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createImportSyncPhase from '../src/phases/createImportSyncPhase';
import type { Phase } from '../types.flow';

// TODO: check we can actually import this package (whether we have config for it)
// yarn monorepo-babel-node src/monorepo-shipit/bin/importit.js git@github.com:adeira/fetch.git 1

const gitRegex = /^git@github.com:(?<packageName>.+)\.git$/;

type ImportitCLIType = {
  +configFilter: string,
  +configDir: string,
  +committerName?: string,
  +committerEmail?: string,
  +pullRequestId?: string,
  +repoUrl?: string,
};

const options: ImportitCLIType = commandLineArgs(
  [
    {
      name: 'config-filter',
      type: String,
      defaultValue: '/*.js',
    },
    {
      name: 'config-dir',
      type: String,
      defaultValue: './.shipit',
    },
    {
      name: 'committer-name',
      type: String,
    },
    {
      name: 'committer-email',
      type: String,
    },
    {
      name: 'pull-request-id',
      type: String,
    },
    {
      name: 'repo-url',
      type: String,
    },
  ],
  { camelCase: true },
);

const argPullRequestId = options.pullRequestId;
const argRepoUrl = options.repoUrl;

invariant(options.committerName != null, 'committer-name is required');
invariant(options.committerEmail != null, 'committer-email is required');
invariant(argRepoUrl != null, 'repo-url is required');
invariant(argPullRequestId != null, 'pull-request-id is required');

process.env.SHIPIT_COMMITTER_EMAIL = options.committerEmail;
process.env.SHIPIT_COMMITTER_NAME = options.committerName;

invariant(
  gitRegex.test(argRepoUrl),
  'We currently support imports only from GitHub.com - please open an issue to add additional services.',
);

const match = argRepoUrl.match(gitRegex);
const packageName = match?.groups?.packageName;

invariant(packageName != null, 'Cannot figure out package name from: %s', argRepoUrl);

iterateConfigs(options, (config) => {
  if (config.exportedRepoURL === argRepoUrl) {
    new Set<Phase>([
      createClonePhase(config.exportedRepoURL, config.destinationPath),
      createCheckCorruptedRepoPhase(config.destinationPath),
      createCleanPhase(config.destinationPath),
      createImportSyncPhase(config, packageName, argPullRequestId),
    ]).forEach((phase) => phase());
  }
});
