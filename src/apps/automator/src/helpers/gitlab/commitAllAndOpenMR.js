// @flow

import { Git } from '@kiwicom/monorepo';

import commitAllChanges from '../commitAllChanges';
import openMergeRequest from './openMergeRequest';
import log from '../../log';

export default async function commitAllAndOpenMR(
  taskIdentifier: string,
  commitMessage: string,
) {
  const changedFiles = Git.getWorktreeChangedFiles();
  if (changedFiles.length === 0) {
    log(taskIdentifier, 'nothing to do here, skipping');
    return;
  }

  const gitBranchName = await commitAllChanges(taskIdentifier, commitMessage);
  await openMergeRequest(gitBranchName, commitMessage);
}
