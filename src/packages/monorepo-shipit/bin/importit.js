#!/usr/bin/env node

// @flow strict-local

import path from 'path';
import { findRootPackageJsonPath } from '@kiwicom/monorepo';

import createClonePhase from '../src/phases/createClonePhase';
import createImportSyncPhase from '../src/phases/createImportSyncPhase';
import PhaseRunnerConfig from '../src/PhaseRunnerConfig';

// TODO: check we can actually import this package + validate it's GitHub (how should the CLI command look like?)
const monorepoPath = path.dirname(findRootPackageJsonPath());
const exportedRepoURL = 'git@github.com:mrtnzlml/REMOVE-fetch.git';
const directoryMapping = new Map([['src/packages/fetch/', '']]);

const cfg = new PhaseRunnerConfig(
  monorepoPath,
  exportedRepoURL,
  directoryMapping,
);

// TODO: PhaseRunner
new Set<() => void>([
  createClonePhase(cfg.exportedRepoURL, cfg.exportedRepoPath),
  createImportSyncPhase(cfg),
  // TODO: commit
]).forEach(phase => phase());
