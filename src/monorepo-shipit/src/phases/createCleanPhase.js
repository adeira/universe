// @flow

import RepoGit from '../RepoGit';

export default function createCleanPhase(repoPath: string) {
  return function () {
    const repo = new RepoGit(repoPath);
    repo.clean();
  };
}
