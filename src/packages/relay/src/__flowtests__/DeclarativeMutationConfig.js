// @flow

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { commitMutation, graphql } from '../index';

const environment = new Environment({
  network: Network.create(() => {}),
  store: new Store(new RecordSource()),
});

const mutation = graphql`
  mutation DeclarativeMutationConfig {
    __typename
  }
`;

const variables = {};

module.exports = {
  validConfigs: () => {
    return commitMutation(environment, {
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
  invalidConfigType: () => {
    return commitMutation(environment, {
      mutation,
      variables,
      configs: [
        // $FlowExpectedError: RANGE_WTF is not allowed type
        {
          type: 'RANGE_WTF',
        },
      ],
    });
  },
  invalidRangeBehaviors: () => {
    return commitMutation(environment, {
      mutation,
      variables,
      configs: [
        {
          type: 'RANGE_ADD',
          edgeName: 'tvShow',
          connectionInfo: [
            {
              key: 'FavoritesList_favorites',
              // $FlowExpectedError: unsupported range behavior
              rangeBehavior: 'unsupported',
            },
          ],
        },
      ],
    });
  },
};
