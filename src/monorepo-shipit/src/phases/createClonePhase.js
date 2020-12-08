// @flow strict-local

import path from 'path';
import { sprintf } from '@adeira/js';
import { ShellCommand } from '@adeira/monorepo-utils';

import RepoGit from '../RepoGit';

export default function createClonePhase(
  exportedRepoURL: string,
  exportedRepoPath: string,
): () => void {
  const phase = function () {
    // from destination path `/x/y/z` to:
    const dirname = path.dirname(exportedRepoPath); // `/x/y`
    const basename = path.basename(exportedRepoPath); // `z`

    // TODO: make it Git agnostic

    new ShellCommand(dirname, 'git', 'clone', exportedRepoURL, basename).runSynchronously();

    const exportedRepo = new RepoGit(exportedRepoPath);
    exportedRepo.configure();
  };

  phase.readableName = sprintf('Clone and configure %s', exportedRepoURL);
  return phase;
}
