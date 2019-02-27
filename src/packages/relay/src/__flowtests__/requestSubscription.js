// @flow

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { requestSubscription, graphql } from '../index';

const environment = new Environment({
  network: Network.create(() => {}),
  store: new Store(new RecordSource()),
});

module.exports = {
  validMutation() {
    return requestSubscription(environment, {
      subscription: graphql`
        subscription requestSubscription {
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
    return requestSubscription(environment, {
      subscription: graphql`
        subscription requestSubscription {
          __typename
        }
      `,
    });
  },
};
