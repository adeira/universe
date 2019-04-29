#!/usr/bin/env node

// @flow strict-local

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createSyncPhase from '../src/phases/createSyncPhase';
import createPushPhase from '../src/phases/createPushPhase';

iterateConfigs(cfg => {
  // See: https://github.com/babel/babel/issues/9921 (vv)
  // new Set<() => void>([
  new Set([
    createClonePhase(cfg.exportedRepoURL, cfg.exportedRepoPath),
    createCheckCorruptedRepoPhase(cfg.exportedRepoPath),
    createCleanPhase(cfg.exportedRepoPath),
    createSyncPhase(cfg),
    // TODO: verify phase
    createPushPhase(cfg.exportedRepoPath),
  ]).forEach(phase => phase());
});
