#!/usr/bin/env node

// @flow strict-local

import path from 'path';
import { findRootPackageJsonPath } from '@kiwicom/monorepo';

import PhaseRunner from '../src/PhaseRunner';
import PhaseRunnerConfig from '../src/PhaseRunnerConfig';
import OSSPackages from '../../../open-source';

// TODO: fail on errors (see: https://gitlab.skypicker.com/incubator/universe/-/jobs/4646614)

for (const config of OSSPackages.values()) {
  const monorepoPath = path.dirname(findRootPackageJsonPath());
  new PhaseRunner(
    new PhaseRunnerConfig(
      monorepoPath,
      config.exportedRepoURL,
      config.directoryMapping,
    ),
  ).run();
}
