// @flow

import { getWorktreeChangedFiles } from '@kiwicom/monorepo';
import { updateDatasets } from '@kiwicom/graphql-skymock'; // eslint-disable-line no-restricted-imports

import log from '../log';
import commitAllChanges from '../helpers/commitAllChanges';
import openMergeRequest from '../helpers/gitlab/openMergeRequest';

const COMMIT_MESSAGE = 'GraphQL Skymock: sync datasets with real API';

export default async function run(taskIdentifier: string) {
  log(taskIdentifier, 'executing GraphQL Skymock updater');

  await updateDatasets();

  const changedFiles = getWorktreeChangedFiles();
  if (changedFiles.length === 0) {
    log(taskIdentifier, 'nothing to do here, skipping');
    return;
  }

  const gitBranchName = await commitAllChanges(changedFiles, COMMIT_MESSAGE);
  await openMergeRequest(gitBranchName, COMMIT_MESSAGE);
}
