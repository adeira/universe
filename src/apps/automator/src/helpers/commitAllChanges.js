// @flow

import _git from './git';

function createBranchName(taskIdentifier: string): string {
  return `automator-${taskIdentifier}`;
}

export default async function commitAllChanges(
  taskIdentifier: string,
  commitMessage: string,
): Promise<string> {
  const gitBranchName = createBranchName(taskIdentifier);

  await _git(['config', 'user.email', 'martin.zlamal@kiwi.com']);
  await _git(['config', 'user.name', 'Automator']);
  await _git(['remote', 'set-url', 'origin', require('../repoURL')]);
  await _git(['checkout', '-B', gitBranchName, 'HEAD']);
  await _git(['add', '--all']);
  await _git(['commit', '-am', commitMessage]);
  await _git(['push', '--force-with-lease', 'origin', gitBranchName]);

  return gitBranchName;
}
