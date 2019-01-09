// @flow

import isCI from 'is-ci';

import log from './log';
import updateDocs from './tasks/updateDocs';
import publishWorkspaceOnGitHub from './tasks/publishWorkspaceOnGitHub';

const ciNode = {
  // nodes are indexed from 1 (not zero)
  index: Number(process.env.CI_NODE_INDEX ?? 1), // eslint-disable-line no-process-env
  total: Number(process.env.CI_NODE_TOTAL ?? 1), // eslint-disable-line no-process-env
};

const tasks = [
  updateDocs, // updates Docs and sends MR to GitLab repo
  publishWorkspaceOnGitHub, // publishes workspace on GitHub (WIP)
];

(async function run() {
  if (isCI === false) {
    // It's to dangerous to run it locally since it changes Git settings or
    // alters directory structure (deletes stuff). Use tests instead
    // to verify everything works correctly.
    throw new Error('Automator requires CI environment to run.');
  }

  if (tasks[ciNode.index - 1] === undefined) {
    throw new Error(`No task defined for CI node with index: ${ciNode.index}`);
  }

  const taskIdentifier = String(ciNode.index);
  log(taskIdentifier, 'running task');
  await tasks[ciNode.index - 1](taskIdentifier);
})();
