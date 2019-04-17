// @flow

import RepoGIT from '../RepoGIT';

export default function createCleanPhase(path: string) {
  return function() {
    const repo = new RepoGIT(path);
    repo.clean();
  };
}
