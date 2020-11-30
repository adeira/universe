#!/usr/bin/env node
// @flow

// TODO: DRY with monorepo-utils/bin/monorepo-babel-node-runner.js
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward',
});

const path = require('path');
const fs = require('fs');
const os = require('os');
const { Git } = require('@adeira/monorepo-utils');

const { default: Flow, root } = require('../src/index');

const argv = process.argv.splice(2);
const cli = (command) => argv.includes(command);

const savedStatePath = path.join(root, '.flow.saved_state');
const savedStateFileChangesPath = path.join(root, '.flow.saved_state_file_changes');

const changedFiles = Git.getChangesToTest();
fs.writeFileSync(
  savedStateFileChangesPath,
  changedFiles.filter((file) => /\.(?:js|json|flow)$/.test(file)).join(os.EOL) + os.EOL,
);

const flowOptions = argv.filter((option) => {
  return !['restart', '--all'].includes(option);
});

if (cli('restart')) {
  Flow.restartServer(flowOptions);
}
Flow.startServerSilently(flowOptions, cli('--all'));

if (!fs.existsSync(savedStatePath)) {
  // This is probably a first start so saved state doesn't exist and saved-state-force-recheck didn't work.
  // Therefore, we have to refocus manually (lazy mode would start from 0 files otherwise).
  Flow.forceRecheck(flowOptions, savedStateFileChangesPath);
}

const statusExitCode = Flow.checkStatus(flowOptions);
if (statusExitCode === 0 && !cli('--all')) {
  // We assume that there are 0 errors when saving the state. It's not necessary to save the state
  // when running with `--all` since it's not being used.
  Flow.saveState(flowOptions, savedStatePath);
} else {
  process.exit(statusExitCode);
}
