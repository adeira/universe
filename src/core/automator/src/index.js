// @flow

import isCI from 'is-ci';

import log from './log';
import updateDocs from './tasks/updateDocs';
import updateHiringBanners from './tasks/updateHiringBanners';
import updateGraphQLSkymock from './tasks/updateGraphQLSkymock';
import updateDependencies from './tasks/updateDependencies';

const ciNode = {
  // nodes are indexed from 1 (not zero)
  index: Number(process.env.CI_NODE_INDEX ?? 1), // eslint-disable-line no-process-env
  total: Number(process.env.CI_NODE_TOTAL ?? 1), // eslint-disable-line no-process-env
};

const tasks = new Map([
  //
  // Do not forget that task identifier is actually very important. For example:
  // <!-- AUTOMATOR:UPDATE_DOCS --> ... <!-- /AUTOMATOR:UPDATE_DOCS -->
  //
  ['UPDATE_DOCS', updateDocs], // updates Docs and sends MR to GitLab repo
  ['HIRING_BANNER', updateHiringBanners],
  ['UPDATE_GRAPHQL_SKYMOCK', updateGraphQLSkymock],
  ['UPDATE_DEPENDENCIES', updateDependencies],
]);

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

(async function run() {
  if (isCI === false) {
    // It's to dangerous to run it locally since it changes Git settings or
    // alters directory structure (deletes stuff). Use tests instead
    // to verify everything works correctly.
    throw new Error('Automator requires CI environment to run.');
  }

  if (tasks.size !== ciNode.total) {
    throw new Error(
      `CI is trying to run Automator with ${ciNode.total} nodes but there are ${
        tasks.size
      } tasks available (incompatible cardinalities).`,
    );
  }

  const arrayTasks = Array.from(tasks);
  const taskIdentifier = arrayTasks[ciNode.index - 1][0];
  const task = arrayTasks[ciNode.index - 1][1];

  log(taskIdentifier, 'running task');
  await task(taskIdentifier);
})();
