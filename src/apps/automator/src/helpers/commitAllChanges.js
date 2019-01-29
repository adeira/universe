// @flow

import crypto from 'crypto';

import _git from './git';

function createBranchName(changedFiles: $ReadOnlyArray<string>): string {
  const hash = crypto.createHash('sha256');
  changedFiles.forEach(changedFile => {
    hash.update(changedFile);
  });
  return `automator-${hash.digest('hex')}`;
}

export default async function commitAllChanges(
  changedFiles: $ReadOnlyArray<string>,
  commitMessage: string,
): Promise<string> {
  const gitBranchName = createBranchName(changedFiles);

  // TODO: add support for automatic rebasing on top of current master branch

  await _git(['config', 'user.email', 'martin.zlamal@kiwi.com']);
  await _git(['config', 'user.name', 'Automator']);
  await _git(['remote', 'set-url', 'origin', require('../repoURL')]);
  await _git(['checkout', '-b', gitBranchName]);
  await _git(['diff']);
  await _git(['add', '--all']);
  await _git(['commit', '-am', commitMessage]);
  await _git(['push', 'origin', gitBranchName]);

  return gitBranchName;
}
