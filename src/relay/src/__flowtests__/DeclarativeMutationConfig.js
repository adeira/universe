// @flow

import type { Disposable } from '@adeira/relay-runtime';

import { commitMutation, graphql, createLocalEnvironment } from '../index';

const environment = createLocalEnvironment();
const mutation = graphql`
  mutation DeclarativeMutationConfig {
    __typename
  }
`;

const variables = {};

type MutationTypeMock = any;

module.exports = {
  validConfigs: (): Disposable => {
    return commitMutation<MutationTypeMock>(environment, {
      mutation,
      variables,
      configs: [
        {
          type: 'RANGE_ADD',
          parentID: 'client:root',
          connectionInfo: [
            {
              key: 'FavoritesList_favorites',
              rangeBehavior: 'prepend',
            },
          ],
          edgeName: 'tvShow',
        },
        {
          type: 'RANGE_DELETE',
          parentID: 'client:root',
          connectionKeys: [
            {
              key: 'FavoritesList_favorites',
            },
          ],
          pathToConnection: ['client:root', 'favorites'],
          deletedIDFieldName: 'serieId',
        },
      ],
    });
  },

  // Invalid examples:
  invalidConfigType: (): Disposable => {
    return commitMutation<MutationTypeMock>(environment, {
      mutation,
      variables,
      configs: [
        // $FlowExpectedError[incompatible-call]: RANGE_WTF is not allowed type
        {
          type: 'RANGE_WTF',
        },
      ],
    });
  },
  invalidRangeBehaviors: (): Disposable => {
    return commitMutation<MutationTypeMock>(environment, {
      mutation,
      variables,
      configs: [
        {
          type: 'RANGE_ADD',
          edgeName: 'tvShow',
          connectionInfo: [
            {
              key: 'FavoritesList_favorites',
              // $FlowExpectedError[incompatible-call]: unsupported range behavior
              rangeBehavior: 'unsupported',
            },
          ],
        },
      ],
    });
  },
};
