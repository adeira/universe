#!/usr/bin/env node

// @flow strict-local

import { iterateReversedConfigs } from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';

// TODO: could this be merged into importit (?)
iterateReversedConfigs(config => {
  new Set<() => void>([
    createClonePhase(config.exportedRepoURL, config.destinationPath),
    createCheckCorruptedRepoPhase(config.destinationPath),
    createCleanPhase(config.destinationPath),
    // TODO: sync it but with reversed destination (and possibly different branch for now)
    // createSyncPhase(config),
    // createPushPhase(config),
  ]).forEach(phase => phase());
});
