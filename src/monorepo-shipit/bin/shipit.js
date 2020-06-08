#!/usr/bin/env node

// @flow strict-local

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createSyncPhase from '../src/phases/createSyncPhase';
import createVerifyRepoPhase from '../src/phases/createVerifyRepoPhase';
import createPushPhase from '../src/phases/createPushPhase';

iterateConfigs((config) => {
  new Set<() => void>([
    createClonePhase(config.exportedRepoURL, config.destinationPath),
    createCheckCorruptedRepoPhase(config.destinationPath),
    createCleanPhase(config.destinationPath),
    createSyncPhase(config),
    createVerifyRepoPhase(config),
    createPushPhase(config),
  ]).forEach((phase) => phase());
});
