// @flow

import RepoGit from '../RepoGit';

export default function createCleanPhase(repoPath: string): () => void {
  const phase = function () {
    const repo = new RepoGit(repoPath);
    repo.clean();
  };

  phase.readableName = 'Clean repository';
  return phase;
}
