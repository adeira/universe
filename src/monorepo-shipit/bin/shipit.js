#!/usr/bin/env node

// @flow

import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import { invariant } from '@adeira/js';

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createSyncPhase from '../src/phases/createSyncPhase';
import createVerifyRepoPhase from '../src/phases/createVerifyRepoPhase';
import createPushPhase from '../src/phases/createPushPhase';
import type { Phase } from '../types.flow';

// yarn monorepo-babel-node src/monorepo-shipit/bin/shipit.js
// yarn monorepo-babel-node src/monorepo-shipit/bin/shipit.js --config-filter="/abacus.js"

type ShipitCLIType = {
  +configFilter: string,
  +configDir: string,
  +committerName?: string,
  +committerEmail?: string,
};

const options: ShipitCLIType = commandLineArgs(
  [
    {
      // This option allows us to grep subset of config files. Especially useful when running the
      // Shipit binary locally for testing purposes.
      name: 'config-filter',
      type: String,
      defaultValue: '/*.js',
    },
    {
      name: 'config-dir',
      type: String,
      defaultValue: './.shipit',
    },
    {
      name: 'committer-name',
      type: String,
    },
    {
      name: 'committer-email',
      type: String,
    },
  ],
  { camelCase: true },
);

invariant(options.committerName != null, 'committer-name is required');
invariant(options.committerEmail != null, 'committer-email is required');

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
