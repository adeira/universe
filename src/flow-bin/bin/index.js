#!/usr/bin/env node
// @flow

// TODO: DRY with monorepo-utils/bin/monorepo-babel-node-runner.js
// BEGIN-ADEIRA-UNIVERSE-INTERNAL
require('@babel/register')({
  ignore: [/node_modules\/(?!@adeira)/],
  rootMode: 'upward',
});
// END-ADEIRA-UNIVERSE-INTERNAL

const path = require('path');
const fs = require('fs');
const os = require('os');
const isCI = require('is-ci');
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
  return !['stop', 'restart', '--all'].includes(option);
});

if (cli('stop')) {
  process.exit(Flow.stopServer(flowOptions));
}

if (isCI === true) {
  // run full check on CI - we have time there
  Flow.stopServer(flowOptions);
  Flow.startServerSilently(flowOptions, true);
  const statusExitCode = Flow.checkStatus(flowOptions);
  process.exit(statusExitCode);
} else {
  // run optimized flow for local development (with lazy mode and saved state)
  // the caveat is that it might miss some errors in rare edge-cases
  const runAll = cli('--all');

  if (cli('restart')) {
    Flow.stopServer(flowOptions);
  }
  Flow.startServerSilently(flowOptions, runAll);

  if (!fs.existsSync(savedStatePath)) {
    // This is probably a first start so saved state doesn't exist and --saved-state-force-recheck didn't work.
    // Therefore, we have to refocus manually (lazy mode would start from 0 files otherwise).
    // https://flow.org/en/docs/lang/lazy-modes/#toc-forcing-flow-to-treat-a-file-as-focused
    Flow.forceRecheck(flowOptions, savedStateFileChangesPath);
  }

  const statusExitCode = Flow.checkStatus(flowOptions);
  if (statusExitCode === 0) {
    // We assume that there are 0 errors when saving the state (otherwise we'd save faulty state).
    Flow.saveState(flowOptions, savedStatePath);
  } else {
    process.exit(statusExitCode);
  }
}
