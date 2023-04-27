// @flow

import RepoGit from '../RepoGit';
import type { Phase } from '../../types.flow';

export default function createCleanPhase(repoPath: string): Phase {
  const phase = function () {
    const repo = new RepoGit(repoPath);
    repo.clean();
  };

  phase.readableName = 'Clean repository';
  return phase;
}
