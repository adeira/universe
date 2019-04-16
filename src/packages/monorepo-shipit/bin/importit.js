#!/usr/bin/env node

// @flow strict-local

import path from 'path';
import { invariant } from '@kiwicom/js';
import { findRootPackageJsonPath } from '@kiwicom/monorepo';

import createClonePhase from '../src/phases/createClonePhase';
import createImportSyncPhase from '../src/phases/createImportSyncPhase';
import PhaseRunnerConfig from '../src/PhaseRunnerConfig';

// TODO: check we can actually import this package + validate it's GitHub
// yarn monorepo-babel-node src/packages/monorepo-shipit/bin/importit.js git@github.com:mrtnzlml/REMOVE-fetch.git 1

const argv = process.argv.splice(2); // TODO: better CLI
invariant(
  argv.length === 2,
  'Importit expects two arguments: git URL and PR number.',
);

const monorepoPath = path.dirname(findRootPackageJsonPath());
const exportedRepoURL = argv[0]; // git@github.com:mrtnzlml/REMOVE-fetch.git
const directoryMapping = new Map([['src/packages/fetch/', '']]); // TODO
const pullRequestNumber = argv[1];

const cfg = new PhaseRunnerConfig(
  monorepoPath,
  exportedRepoURL,
  directoryMapping,
);

// TODO: PhaseRunner
new Set<() => void>([
  // TODO: clean phase (make sure our working tree is clean!)
  createClonePhase(cfg.exportedRepoURL, cfg.exportedRepoPath),
  createImportSyncPhase(cfg, pullRequestNumber),
]).forEach(phase => phase());
