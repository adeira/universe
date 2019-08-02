#!/usr/bin/env node

// @flow strict-local

import { iterateReversedConfigs } from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createImportReverseSyncPhase from '../src/phases/createImportReverseSyncPhase';

// yarn monorepo-babel-node src/core/monorepo-shipit/bin/importit-reversed.js

iterateReversedConfigs(config => {
  new Set<() => void>([
    createClonePhase(config.exportedRepoURL, config.destinationPath),
    createCheckCorruptedRepoPhase(config.destinationPath),
    createCleanPhase(config.destinationPath),
    createImportReverseSyncPhase(config),
  ]).forEach(phase => phase());
});
