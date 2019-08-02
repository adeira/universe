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

  await _git(['config', 'user.email', 'martin.zlamal+bot@kiwi.com']);
  await _git(['config', 'user.name', 'kiwicom-gitlab-bot']);
  await _git(['remote', 'set-url', 'origin', require('../repoURL')]);
  await _git(['checkout', '-b', gitBranchName, 'HEAD']); // will fail if branch already exists
  await _git(['add', '--all']);
  await _git(['commit', '-am', commitMessage]);
  await _git(['push', 'origin', gitBranchName]);

  return gitBranchName;
}
