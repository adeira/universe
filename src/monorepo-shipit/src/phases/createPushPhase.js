// @flow strict-local

import RepoGit from '../RepoGit';
import ShipitConfig from '../ShipitConfig';

export default function createPushPhase(config: ShipitConfig): () => void {
  const phase = function () {
    const repo = new RepoGit(config.destinationPath);
    repo.push(config.getDestinationBranch());
  };

  phase.readableName = 'Push new changes';
  return phase;
}
