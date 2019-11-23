// @flow

import { requestSubscription, graphql, createLocalEnvironment } from '../index';

const environment = createLocalEnvironment();

function validUpdater(store) {
  const favorite = store.get('unique:ID');
  if (favorite) {
    favorite.setValue(false, 'isNew');
  }
}

const subscription = graphql`
  subscription requestSubscription {
    __typename
  }
`;

const variables = {
  aaa: 111,
};

type SubscriptionTypeMock = any;

module.exports = {
  validMutation() {
    return requestSubscription<SubscriptionTypeMock>(environment, {
      subscription,
      variables,
    });
  },
  updater() {
    return requestSubscription<SubscriptionTypeMock>(environment, {
      subscription,
      variables,
      updater: validUpdater,
    });
  },

  // Invalid usages:
  missingVariables() {
    // $FlowExpectedError: variables are missing
    return requestSubscription<SubscriptionTypeMock>(environment, {
      subscription: graphql`
        subscription requestSubscription {
          __typename
        }
      `,
    });
  },
};
