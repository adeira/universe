// @flow strict-local

import path from 'path';
import { ShellCommand } from '@kiwicom/monorepo-utils';

import RepoGIT from '../RepoGIT';

export default function createClonePhase(exportedRepoURL: string, exportedRepoPath: string) {
  return function() {
    // from destination path '/x/y/universe' to:
    const dirname = path.dirname(exportedRepoPath); // '/x/y'
    const basename = path.basename(exportedRepoPath); // 'universe'

    // TODO: make it Git agnostic

    new ShellCommand(dirname, 'git', 'clone', exportedRepoURL, basename)
      .setOutputToScreen()
      .runSynchronously();

    const exportedRepo = new RepoGIT(exportedRepoPath);
    exportedRepo.configure();
  };
}
