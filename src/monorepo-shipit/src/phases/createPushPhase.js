// @flow strict-local

import RepoGit from '../RepoGit';
import ShipitConfig from '../ShipitConfig';

export default function createPushPhase(config: ShipitConfig) {
  return function () {
    const repo = new RepoGit(config.destinationPath);
    repo.push(config.getDestinationBranch());
  };
}
