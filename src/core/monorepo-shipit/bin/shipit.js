#!/usr/bin/env node

// @flow strict-local

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createSyncPhase from '../src/phases/createSyncPhase';
import createVerifyRepoPhase from '../src/phases/createVerifyRepoPhase';
import createPushPhase from '../src/phases/createPushPhase';

iterateConfigs(cfg => {
  new Set<() => void>([
    createClonePhase(cfg.exportedRepoURL, cfg.destinationPath),
    createCheckCorruptedRepoPhase(cfg.destinationPath),
    createCleanPhase(cfg.destinationPath),
    createSyncPhase(cfg),
    createVerifyRepoPhase(cfg),
    createPushPhase(cfg.destinationPath),
  ]).forEach(phase => phase());
});
