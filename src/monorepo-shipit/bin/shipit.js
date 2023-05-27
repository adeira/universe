#!/usr/bin/env node

// @flow

import chalk from 'chalk';
import { program as commander } from 'commander';

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createSyncPhase from '../src/phases/createSyncPhase';
import createVerifyRepoPhase from '../src/phases/createVerifyRepoPhase';
import createPushPhase from '../src/phases/createPushPhase';
import type { Phase } from '../types.flow';

// yarn monorepo-babel-node src/monorepo-shipit/bin/shipit.js --help
// yarn monorepo-babel-node src/monorepo-shipit/bin/shipit.js --committer-name=A --committer-email=B

type ShipitCLIType = {
  +configFilter: string,
  +configDir: string,
  +committerName: string,
  +committerEmail: string,
};

commander
  .version(require('./../package.json').version)
  .description('Export a monorepo to multiple git repositories')
  .requiredOption('--config-filter <glob>', 'Glob pattern to filter config files', '/*.js')
  .requiredOption('--config-dir <path>', 'Path to the directory with config files', './.shipit')
  .requiredOption('--committer-name <name>', 'Name of the committer')
  .requiredOption('--committer-email <email>', 'Email of the committer');

commander.parse();
const options: ShipitCLIType = commander.opts();

process.env.SHIPIT_COMMITTER_EMAIL = options.committerEmail;
process.env.SHIPIT_COMMITTER_NAME = options.committerName;

iterateConfigs(options, (config) => {
  new Set<Phase>([
    createClonePhase(config.exportedRepoURL, config.destinationPath),
    createCheckCorruptedRepoPhase(config.destinationPath),
    createCleanPhase(config.destinationPath),
    createSyncPhase(config),
    createVerifyRepoPhase(config),
    createPushPhase(config),
  ]).forEach((phase) => {
    console.log(`${chalk.dim('Starting phase:')} %s`, phase.readableName);
    phase();
    console.log(`${chalk.dim('Finished phase:')} %s`, phase.readableName);
  });
  console.log(''); // just to add a new line between each config
});
