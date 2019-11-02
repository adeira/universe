// @flow

import { Git } from '@adeira/monorepo-utils';

import commitAllChanges from '../commitAllChanges';
import openMergeRequest from './openMergeRequest';
import log from '../../log';

export default async function commitAllAndOpenMR(
  taskIdentifier: string,
  commitMessage: string,
  commitDescription?: string,
) {
  const changedFiles = Git.getWorktreeChangedFiles();
  if (changedFiles.length === 0) {
    log(taskIdentifier, 'nothing to do here, skipping');
    return;
  }

  const gitBranchName = await commitAllChanges(taskIdentifier, commitMessage);
  await openMergeRequest(gitBranchName, commitMessage, commitDescription);
}
