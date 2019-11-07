#!/usr/bin/env node

// @flow strict-local

import { invariant } from '@adeira/js';

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createImportSyncPhase from '../src/phases/createImportSyncPhase';

// TODO: check we can actually import this package (whether we have config for it)
// yarn monorepo-babel-node src/core/monorepo-shipit/bin/importit.js git@github.com:adeira/fetch.git 1

const argv = process.argv.splice(2); // TODO: better CLI
invariant(argv.length === 2, 'Importit expects two arguments: git URL and PR number.');

const exportedRepoURL = argv[0]; // git@github.com:adeira/fetch.git
const pullRequestNumber = argv[1];

const gitRegex = /^git@github.com:(?<packageName>.+)\.git$/;
invariant(
  gitRegex.test(exportedRepoURL),
  'We currently support imports only from GitHub.com - please open an issue to add additional services.',
);

const match = exportedRepoURL.match(gitRegex);
const packageName = match?.groups?.packageName;
invariant(packageName != null, 'Cannot figure out package name from: %s', exportedRepoURL);

iterateConfigs(config => {
  if (config.exportedRepoURL === exportedRepoURL) {
    new Set<() => void>([
      createClonePhase(config.exportedRepoURL, config.destinationPath),
      createCheckCorruptedRepoPhase(config.destinationPath),
      createCleanPhase(config.destinationPath),
      createImportSyncPhase(config, packageName, pullRequestNumber),
    ]).forEach(phase => phase());
  }
});

// TODO: make it better
