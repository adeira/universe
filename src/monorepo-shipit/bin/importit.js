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

const options = commandLineArgs(
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
      type: Number,
    },
    {
      name: 'repo-url',
      type: Number,
    },
  ],
  { camelCase: true },
);

invariant(options.committerName, 'committer-name is required');
invariant(options.committerEmail, 'committer-email is required');
invariant(options.repoUrl, 'repo-url is required');
invariant(options.pullRequestId, 'pull-request-id is required');

process.env.SHIPIT_COMMITTER_EMAIL = options.committerName;
process.env.SHIPIT_COMMITTER_NAME = options.committerEmail;

invariant(
  gitRegex.test(options.repoUrl),
  'We currently support imports only from GitHub.com - please open an issue to add additional services.',
);

const match = options.repoUrl.match(gitRegex);
const packageName = match?.groups?.packageName;

invariant(packageName != null, 'Cannot figure out package name from: %s', options.repoUrl);

iterateConfigs(options, (config) => {
  if (config.exportedRepoURL === options.repoUrl) {
    new Set<Phase>([
      createClonePhase(config.exportedRepoURL, config.destinationPath),
      createCheckCorruptedRepoPhase(config.destinationPath),
      createCleanPhase(config.destinationPath),
      createImportSyncPhase(config, packageName, options.pullRequestId),
    ]).forEach((phase) => phase());
  }
});

// TODO: make it better
