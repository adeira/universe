// @flow strict-local

import RepoGIT from '../RepoGIT';

export default function createPushPhase(repoPath: string) {
  return function() {
    const repo = new RepoGIT(repoPath);
    repo.push();
  };
}
