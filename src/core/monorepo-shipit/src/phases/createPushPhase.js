// @flow strict-local

import RepoGit from '../RepoGit';

export default function createPushPhase(repoPath: string) {
  return function() {
    const repo = new RepoGit(repoPath);
    repo.push();
  };
}
