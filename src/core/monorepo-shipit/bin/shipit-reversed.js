#!/usr/bin/env node

// @flow strict-local

import { iterateReversedConfigs } from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';

// TODO: could this be merged into importit (?)
iterateReversedConfigs(cfg => {
  new Set<() => void>([
    createClonePhase(cfg.exportedRepoURL, cfg.destinationPath),
    createCheckCorruptedRepoPhase(cfg.destinationPath),
    createCleanPhase(cfg.destinationPath),
    // TODO: sync it but with reversed destination (and possibly different branch for now)
  ]).forEach(phase => phase());
});
