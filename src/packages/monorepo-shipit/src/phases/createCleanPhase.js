// @flow

import RepoGIT from '../RepoGIT';

export default function createCleanPhase(repoPath: string) {
  return function() {
    const repo = new RepoGIT(repoPath);
    repo.clean();
  };
}
