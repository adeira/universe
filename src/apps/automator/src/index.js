// @flow

import updateNPMPackagesInfo from './tasks/updateNPMPackagesInfo';
import paths from '../../../../paths';

// TODO:
// - do something
// - create branch and commit it
// - push and open MR only if something changed (https://docs.gitlab.com/ee/api/merge_requests.html#create-mr)

// yarn babel-node src/packages/automator/src/index.js
(function run() {
  updateNPMPackagesInfo(paths.readme);
})();
