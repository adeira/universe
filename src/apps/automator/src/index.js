// @flow

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

(function run() {
  if (tasks[ciNode.index - 1] === undefined) {
    throw new Error(`No task defined for CI node with index: ${ciNode.index}`);
  }

  const taskIdentifier = String(ciNode.index);
  log(taskIdentifier, 'running task');
  tasks[ciNode.index - 1](taskIdentifier);
})();
