#!/usr/bin/env node

// @flow strict-local

import iterateConfigs from './iterateConfigs';
import createCleanPhase from '../src/phases/createCleanPhase';
import createClonePhase from '../src/phases/createClonePhase';
import createSyncPhase from '../src/phases/createSyncPhase';
import createPushPhase from '../src/phases/createPushPhase';

iterateConfigs(cfg => {
  new Set<() => void>([
    createClonePhase(cfg.exportedRepoURL, cfg.exportedRepoPath),
    createCleanPhase(cfg.exportedRepoPath),
    createSyncPhase(cfg),
    // TODO: verify phase
    createPushPhase(cfg.exportedRepoPath),
  ]).forEach(phase => phase());
});
