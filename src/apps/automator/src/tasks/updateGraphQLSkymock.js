// @flow

import { getWorktreeChangedFiles } from '@kiwicom/monorepo';
import { updateDatasets } from '@kiwicom/graphql-skymock'; // eslint-disable-line no-restricted-imports

import log from '../log';

export default async function run(taskIdentifier: string) {
  log(taskIdentifier, 'executing GraphQL Skymock updater');

  await updateDatasets();

  const changedFiles = getWorktreeChangedFiles();
  if (changedFiles.length === 0) {
    log(taskIdentifier, 'nothing to do here, skipping');
    return;
  }

  log(
    taskIdentifier,
    `Changed files: ${JSON.stringify(changedFiles, null, 2)}`,
  );
  log(taskIdentifier, '⚠️ TODO ⚠️');

  // TODO: send MR
}
