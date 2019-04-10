// @flow strict-local

import { ChildProcess } from '@kiwicom/monorepo';

export default function createPushPhase(repoPath: string) {
  // TODO: this should be "Git" agnostict (move it to the `Git` class where is the specific implementation)
  return function() {
    ChildProcess.executeSystemCommand('git', ['push', 'origin', 'master'], {
      stdio: 'inherit',
      cwd: repoPath,
    });
  };
}
