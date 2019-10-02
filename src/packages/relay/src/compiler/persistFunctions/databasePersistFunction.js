// @flow

import isCI from 'is-ci';
import logger from '@kiwicom/logger';

import createQueryID from './createQueryID';
import graphql from '../../graphql';
import { commitMutation } from '../../mutations';
import createEnvironment from '../../createEnvironment';
import createNetworkFetcher from '../../fetchers/createNetworkFetcher';

// This mutation persist operations to our GraphQL Persistent Storage for later direct usage.
function persistOperation(operationId: string, text: string) {
  return commitMutation(
    createEnvironment({
      logger: false,
      fetchFn: createNetworkFetcher('https://graphql.kiwi.com/', {
        'X-Client': 'Kiwi.com Relay Compiler',
      }),
    }),
    {
      mutation: graphql`
        mutation databasePersistFunctionMutation($input: [StoredOperationInput!]!) {
          createStoredOperations(persistedOperations: $input) {
            createdOperations {
              operationId
              text
            }
          }
        }
      `,
      variables: {
        input: { operationId, text },
      },
      onError: error => {
        logger.error('TODO: onError', String(error));
        process.exitCode = 1;
      },
      onCompleted: (response, errors) => {
        logger.error('TODO: onCompleted', String(JSON.stringify(response)), String(errors));
        process.exitCode = 2;
      },
    },
  );
}

/**
 * Database persister takes the query text and sends it to the server.
 */
export default function defaultPersistFunction(query: string): Promise<string> {
  const id = createQueryID(query);
  if (isCI === true) {
    // Please note: we are generating here the ID and sending it to the server. Much better approach
    // would be to get it from the server. However, this would mean that the application must be
    // always online during development (FB way). That's good only for large applications.
    persistOperation(id, query);
  }
  return Promise.resolve(id);
}
