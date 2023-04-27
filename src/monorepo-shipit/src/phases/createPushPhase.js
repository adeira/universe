// @flow strict-local

import RepoGit from '../RepoGit';
import ShipitConfig from '../ShipitConfig';
import type { Phase } from '../../types.flow';

export default function createPushPhase(config: ShipitConfig): Phase {
  const phase = function () {
    const repo = new RepoGit(config.destinationPath);
    repo.push(config.getDestinationBranch());
  };

  phase.readableName = 'Push new changes';
  return phase;
}
