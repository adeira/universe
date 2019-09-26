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

type NamedMutationVariables = {|
  +someNumber: number,
  +someEnum: 'down' | 'up',
|};

type NamedMutationResponse = {|
  +commitMutation: ?{|
    +__typename: 'CommitMutationResponse',
  |},
|};

type NamedMutation = {|
  +variables: NamedMutationVariables,
  +response: NamedMutationResponse,
|};

module.exports = {
  validMutation() {
    return commitMutation(environment, {
      mutation,
      variables,
    });
  },
  validTypedMutation() {
    return commitMutation<NamedMutation>(environment, {
      mutation,
      variables: {
        someNumber: 111,
        someEnum: 'up',
      },
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
  invalidVariables() {
    // $FlowExpectedError: passed variables are incorrect
    return commitMutation<NamedMutation>(environment, {
      mutation,
      variables: { someNumber: '123' },
    });
  },
  invalidOnCompletedType() {
    // $FlowExpectedError: response type differs from onCompleted declaration
    return commitMutation<NamedMutation>(environment, {
      mutation,
      variables: {
        someNumber: 111,
        someEnum: 'up',
      },
      // eslint-disable-next-line no-unused-vars
      onCompleted: (response: {||}) => {},
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
