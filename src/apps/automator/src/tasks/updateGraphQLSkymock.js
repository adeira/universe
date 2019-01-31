// @flow

import { updateDatasets } from '@kiwicom/graphql-skymock'; // eslint-disable-line no-restricted-imports

import log from '../log';
import commitAllAndOpenMR from '../helpers/gitlab/commitAllAndOpenMR';

const COMMIT_MESSAGE = 'GraphQL Skymock: sync datasets with real API';

export default async function run(taskIdentifier: string) {
  log(taskIdentifier, 'executing GraphQL Skymock updater');

  await updateDatasets();
  await commitAllAndOpenMR(taskIdentifier, COMMIT_MESSAGE);
}
