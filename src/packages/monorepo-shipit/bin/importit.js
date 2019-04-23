#!/usr/bin/env node

// @flow strict-local

import { invariant } from '@kiwicom/js';

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createImportSyncPhase from '../src/phases/createImportSyncPhase';

// TODO: check we can actually import this package + validate it's GitHub
// yarn monorepo-babel-node src/packages/monorepo-shipit/bin/importit.js git@github.com:kiwicom/fetch.git 1

const argv = process.argv.splice(2); // TODO: better CLI
invariant(
  argv.length === 2,
  'Importit expects two arguments: git URL and PR number.',
);

const exportedRepoURL = argv[0]; // git@github.com:kiwicom/fetch.git
const pullRequestNumber = argv[1];

iterateConfigs(cfg => {
  if (cfg.exportedRepoURL === exportedRepoURL) {
    new Set<() => void>([
      createClonePhase(cfg.exportedRepoURL, cfg.exportedRepoPath),
      createCheckCorruptedRepoPhase(cfg.exportedRepoPath),
      createCleanPhase(cfg.exportedRepoPath),
      createImportSyncPhase(cfg, pullRequestNumber),
    ]).forEach(phase => phase());
  }
});

// TODO: make it better
