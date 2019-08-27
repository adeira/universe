#!/usr/bin/env node

// @flow strict-local

import Logger from '@kiwicom/logger';

import { iterateReversedConfigs } from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createImportReverseSyncPhase from '../src/phases/createImportReverseSyncPhase';

// yarn monorepo-babel-node src/core/monorepo-shipit/bin/importit-reversed.js

const importOnly = 'git@github.com:kiwicom/eslint-config-nitro.git';

iterateReversedConfigs(config => {
  const repoUrl = config.exportedRepoURL;
  if (repoUrl === importOnly) {
    Logger.log('Importing: %s', repoUrl);
    new Set<() => void>([
      createClonePhase(repoUrl, config.destinationPath),
      createCheckCorruptedRepoPhase(config.destinationPath),
      createCleanPhase(config.destinationPath),
      createImportReverseSyncPhase(config),
    ]).forEach(phase => phase());
  } else {
    Logger.log('Skipping: %s', repoUrl);
  }
});
