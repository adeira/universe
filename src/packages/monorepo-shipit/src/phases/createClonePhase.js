// @flow strict-local

import path from 'path';
import { ChildProcess } from '@kiwicom/monorepo';

export default function createClonePhase(repoURL: string, repoPath: string) {
  return function() {
    // from destination path '/x/y/universe' to:
    const dirname = path.dirname(repoPath); // '/x/y'
    const basename = path.basename(repoPath); // 'universe'

    // TODO: make it Git agnostic

    ChildProcess.executeSystemCommand('git', ['clone', repoURL, basename], {
      stdio: 'inherit',
      cwd: dirname,
    });

    ChildProcess.executeSystemCommand(
      'git',
      ['config', 'user.email', 'mrtnzlml+kiwicom-github-bot@gmail.com'],
      {
        stdio: 'inherit',
        cwd: repoPath,
      },
    );

    ChildProcess.executeSystemCommand(
      'git',
      ['config', 'user.name', 'kiwicom-github-bot'],
      {
        stdio: 'inherit',
        cwd: repoPath,
      },
    );
  };
}
