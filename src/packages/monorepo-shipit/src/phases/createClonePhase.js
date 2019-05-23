// @flow strict-local

import path from 'path';
import { ShellCommand } from '@kiwicom/monorepo-utils';

export default function createClonePhase(repoURL: string, repoPath: string) {
  return function() {
    // from destination path '/x/y/universe' to:
    const dirname = path.dirname(repoPath); // '/x/y'
    const basename = path.basename(repoPath); // 'universe'

    // TODO: make it Git agnostic

    new ShellCommand(dirname, 'git', 'clone', repoURL, basename)
      .setOutputToScreen()
      .runSynchronously();

    new ShellCommand(
      repoPath,
      'git',
      'config',
      'user.email',
      'mrtnzlml+kiwicom-github-bot@gmail.com',
    )
      .setOutputToScreen()
      .runSynchronously();

    new ShellCommand(
      repoPath,
      'git',
      'config',
      'user.name',
      'kiwicom-github-bot',
    )
      .setOutputToScreen()
      .runSynchronously();
  };
}
