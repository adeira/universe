#!/usr/bin/env node
// @flow

// TODO: DRY with monorepo-utils/bin/monorepo-babel-node-runner.js
require('@babel/register')({
  ignore: [/node_modules\/(?!@kiwicom)/],
  rootMode: 'upward',
});

const path = require('path');
const fs = require('fs');
const os = require('os');
const { findMonorepoRoot, Git } = require('@kiwicom/monorepo-utils');

const Flow = require('../src/index').default;

const argv = process.argv.splice(2);
const cli = command => argv.includes(command);
// Should we forward all unknown commands to Flow?
const allowedCommands = ['restart', '--all'];
for (const command of argv) {
  if (!allowedCommands.includes(command)) {
    const allowedCommandsList = allowedCommands.map(command => `'${command}'`).join(', ');
    throw new Error(
      `Command line option "${command}" is not allowed. You have to use one of these: ${allowedCommandsList}`,
    );
  }
}

const monorepoRoot = findMonorepoRoot();
const savedStatePath = path.join(monorepoRoot, '.flow.saved_state');
const savedStateFileChangesPath = path.join(monorepoRoot, '.flow.saved_state_file_changes');

const changedFiles = Git.getChangesToTest();
fs.writeFileSync(
  savedStateFileChangesPath,
  changedFiles.filter(file => /\.(?:js|json|flow)$/.test(file)).join(os.EOL) + os.EOL,
);

if (cli('restart')) {
  Flow.restartServer();
}
Flow.startServer(cli('--all'));

if (!fs.existsSync(savedStatePath)) {
  // This is probably a first start so saved state doesn't exist and saved-state-force-recheck didn't work.
  // Therefore, we have to refocus manually (lazy mode would start from 0 files otherwise).
  Flow.forceRecheck(savedStateFileChangesPath);
}

const statusExitCode = Flow.checkSatus();
if (statusExitCode === 0) {
  // We assume that there are 0 errors when saving the state.
  Flow.saveState(savedStatePath);
} else {
  process.exit(statusExitCode);
}
