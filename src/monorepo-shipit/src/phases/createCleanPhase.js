// @flow

import RepoGit from '../RepoGit';

export default function createCleanPhase(repoPath: string): () => void {
  return function () {
    const repo = new RepoGit(repoPath);
    repo.clean();
  };
}
