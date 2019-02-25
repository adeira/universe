// @flow

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { commitMutation, graphql } from '../index';

const environment = new Environment({
  network: Network.create(() => {}),
  store: new Store(new RecordSource()),
});

module.exports = {
  validMutation() {
    return commitMutation(environment, {
      mutation: graphql`
        mutation commitMutation {
          __typename
        }
      `,
      variables: {
        aaa: 111,
      },
    });
  },

  // Invalid usages:
  missingVariables() {
    // $FlowExpectedError: variables are missing
    return commitMutation(environment, {
      mutation: graphql`
        mutation commitMutation {
          __typename
        }
      `,
    });
  },
};
