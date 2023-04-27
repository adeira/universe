// @flow strict-local

import { invariant } from '@adeira/js';

import RepoGit from '../RepoGit';
import type { Phase } from '../../types.flow';

export default function createCheckCorruptedRepoPhase(repoPath: string): Phase {
  const phase = function () {
    const repo = new RepoGit(repoPath);

    // We should eventually nuke the repo and clone it again. But we do not
    // store the repos in CI yet so it's not necessary. Also, be careful not
    // to nuke monorepo in CI.
    invariant(repo.isCorrupted() === false, `Repo located in '${repoPath}' is corrupted.`);
  };

  phase.readableName = 'Check if repository is corrupted';
  return phase;
}
