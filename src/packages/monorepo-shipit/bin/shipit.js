#!/usr/bin/env node

// @flow strict-local

import path from 'path';
import { findRootPackageJsonPath } from '@kiwicom/monorepo';

import PhaseRunnerConfig from '../src/PhaseRunnerConfig';
import OSSPackages from '../../../open-source';
import createClonePhase from '../src/phases/createClonePhase';
import createSyncPhase from '../src/phases/createSyncPhase';
import createPushPhase from '../src/phases/createPushPhase';

for (const config of OSSPackages.values()) {
  const monorepoPath = path.dirname(findRootPackageJsonPath());

  const cfg = new PhaseRunnerConfig(
    monorepoPath,
    config.exportedRepoURL,
    config.directoryMapping,
  );

  new Set<() => void>([
    // TODO: clean phase (make sure our working tree is clean!)
    createClonePhase(cfg.exportedRepoURL, cfg.exportedRepoPath),
    createSyncPhase(cfg),
    // TODO: verify phase
    createPushPhase(cfg.exportedRepoPath),
  ]).forEach(phase => phase());
}
