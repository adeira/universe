// @flow

import { commitMutation, graphql, createLocalEnvironment } from '../index';

const environment = createLocalEnvironment();

function validUpdater(store) {
  const favorite = store.get('unique:ID');
  if (favorite) {
    favorite.setValue(false, 'isNew');
  }
}

const mutation = graphql`
  mutation commitMutation {
    __typename
  }
`;

const variables = {
  aaa: 111,
};

module.exports = {
  validMutation() {
    return commitMutation(environment, {
      mutation,
      variables,
    });
  },
  updater() {
    return commitMutation(environment, {
      mutation,
      variables,
      updater: validUpdater,
    });
  },

  // Invalid usages:
  missingVariables() {
    // $FlowExpectedError: variables are missing
    return commitMutation(environment, {
      mutation,
    });
  },
  invalidUpdater() {
    return commitMutation(environment, {
      mutation,
      variables,
      updater: store => {
        // $FlowExpectedError: cannot call store.wtf because property wtf is missing in RecordSourceSelectorProxy
        store.wtf('ups');

        const record = store.get('unique:ID');
        if (record) {
          // $FlowExpectedError: cannot call record.wtf because property wtf is missing in RecordProxy
          record.wtf('ups');
        }
      },
    });
  },
};
