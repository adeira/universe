// @flow strict-local

import path from 'path';
import { ChildProcess } from '@kiwicom/monorepo';

export default function createClonePhase(
  sourceURL: string,
  destinationPath: string,
) {
  return function() {
    // from destination path '/x/y/universe' to:
    const dirname = path.dirname(destinationPath); // '/x/y'
    const basename = path.basename(destinationPath); // 'universe'

    // TODO: make it Git agnostic

    ChildProcess.executeSystemCommand('git', ['clone', sourceURL, basename], {
      stdio: 'inherit',
      cwd: dirname,
    });

    ChildProcess.executeSystemCommand(
      'git',
      ['config', 'user.email', 'mrtnzlml+kiwicom-github-bot@gmail.com'],
      {
        stdio: 'inherit',
        cwd: destinationPath,
      },
    );

    ChildProcess.executeSystemCommand(
      'git',
      ['config', 'user.name', 'kiwicom-github-bot'],
      {
        stdio: 'inherit',
        cwd: destinationPath,
      },
    );
  };
}
