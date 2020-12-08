#!/usr/bin/env node

// @flow strict-local

import logger from '@adeira/logger';
import chalk from 'chalk';

import iterateConfigs from '../src/iterateConfigs';
import createClonePhase from '../src/phases/createClonePhase';
import createCheckCorruptedRepoPhase from '../src/phases/createCheckCorruptedRepoPhase';
import createCleanPhase from '../src/phases/createCleanPhase';
import createSyncPhase from '../src/phases/createSyncPhase';
import createVerifyRepoPhase from '../src/phases/createVerifyRepoPhase';
import createPushPhase from '../src/phases/createPushPhase';

type Phase = {|
  (): void,
  +readableName: string,
|};

iterateConfigs((config) => {
  new Set<Phase>([
    createClonePhase(config.exportedRepoURL, config.destinationPath),
    createCheckCorruptedRepoPhase(config.destinationPath),
    createCleanPhase(config.destinationPath),
    createSyncPhase(config),
    createVerifyRepoPhase(config),
    createPushPhase(config),
  ]).forEach((phase) => {
    logger.log(`${chalk.dim('Starting phase:')} %s`, phase.readableName);
    phase();
    logger.log(`${chalk.dim('Finished phase:')} %s`, phase.readableName);
  });
  logger.log(''); // just to add a new line between each config
});
