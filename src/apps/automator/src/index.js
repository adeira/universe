// @flow

import log from './log';
import updateNPMPackagesInfo from './tasks/updateNPMPackagesInfo';

// TODO:
// - do something
// - create branch and commit it
// - push and open MR only if something changed (https://docs.gitlab.com/ee/api/merge_requests.html#create-mr)

// yarn babel-node src/packages/automator/src/index.js
(function run() {
  const TASK_IDENTIFIER = '1';
  log(TASK_IDENTIFIER, 'starting task');
  updateNPMPackagesInfo(TASK_IDENTIFIER, async () =>
    log(TASK_IDENTIFIER, 'task finished'),
  );
})();
