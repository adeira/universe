// @flow

import {
  commitMutation,
  commitMutationAsync,
  graphql,
  createLocalEnvironment,
  type Disposable,
} from '../index';

const environment = createLocalEnvironment();

function validUpdater(store) {
  const favorite = store.get('unique:ID');
  if (favorite) {
    favorite.setValue(false, 'isNew');
  }
}

const mutation = graphql`
  mutation mutationsExample {
    __typename
  }
`;

const variables = {
  someNumber: 111,
  someEnum: 'up',
};

type NamedMutationVariables = {
  +someNumber: number,
  +someEnum: 'down' | 'up',
};

type NamedMutationResponse = {
  +commitMutation: ?{
    +__typename: 'CommitMutationResponse',
  },
};

type NamedMutation = {
  +variables: NamedMutationVariables,
  +response: NamedMutationResponse,
};

module.exports = {
  validMutation(): Disposable {
    return commitMutation<NamedMutation>(environment, {
      mutation,
      variables,
    });
  },
  validAsyncMutation(): Promise<void> {
    return commitMutationAsync<NamedMutation>(environment, {
      mutation,
      variables,
      // eslint-disable-next-line no-unused-vars
    }).then(({ response }: { +response: NamedMutationResponse, ... }) => {});
  },
  updater(): Disposable {
    return commitMutation<NamedMutation>(environment, {
      mutation,
      variables,
      updater: validUpdater,
    });
  },

  // Invalid usages:
  missingVariables(): Disposable {
    // $FlowExpectedError[prop-missing]: variables are missing
    return commitMutation<NamedMutation>(environment, {
      mutation,
    });
  },
  invalidVariables(): Disposable {
    return commitMutation<NamedMutation>(environment, {
      mutation,
      // $FlowExpectedError[prop-missing]: passed variables are incorrect
      // $FlowExpectedError[incompatible-call]: passed variables are incorrect
      variables: { someNumber: '123' },
    });
  },
  invalidOnCompletedType(): Disposable {
    return commitMutation<NamedMutation>(environment, {
      mutation,
      variables,
      // $FlowExpectedError[prop-missing]: response type differs from onCompleted declaration
      onCompleted: (response: {}) => {}, // eslint-disable-line no-unused-vars
    });
  },
  invalidAsyncMutation(): Promise<{
    +errors: ?$ReadOnlyArray<Error>,
    +response: $ElementType<NamedMutation, 'response'>,
  }> {
    // $FlowExpectedError[prop-missing]: onCompleted is disabled in config for commitMutationAsync
    return commitMutationAsync<NamedMutation>(environment, {
      mutation,
      onCompleted: () => {},
      variables,
    });
  },
  invalidUpdater(): Disposable {
    return commitMutation<NamedMutation>(environment, {
      mutation,
      variables,
      updater: (store) => {
        // $FlowExpectedError[prop-missing]: cannot call store.wtf because property wtf is missing in RecordSourceSelectorProxy
        store.wtf('ups');

        const record = store.get('unique:ID');
        if (record) {
          // $FlowExpectedError[prop-missing]: cannot call record.wtf because property wtf is missing in RecordProxy
          record.wtf('ups');
        }
      },
    });
  },
};
