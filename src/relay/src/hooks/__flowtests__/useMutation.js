// @flow

import type { Disposable } from '@adeira/relay-runtime';

import { useMutation, graphql } from '../index';

const mutation = graphql`
  mutation useMutation {
    __typename
  }
`;

module.exports = {
  validUsage: (): (() => void) => {
    return function TestComponent() {
      const [executeMutation, isMutationPending] = useMutation(mutation);
      (executeMutation: ({|
        onCompleted: () => void,
      |}) => Disposable);
      (isMutationPending: boolean);

      executeMutation({
        onCompleted: () => {},
      });

      executeMutation({
        variables: {},
        onCompleted: () => {},
      });
    };
  },

  // Invalid usages:
  invalidUsage: (): (() => void) => {
    return function TestComponent() {
      const [executeMutation] = useMutation(mutation);

      // $FlowExpectedError[prop-missing]: property onCompleted is missing
      executeMutation({
        variables: {},
      });

      // $FlowExpectedError[prop-missing]: property onCompleted is missing, property wtfIsThis is missing in HookMutationConfig
      executeMutation({
        wtfIsThis: {},
      });
    };
  },
};
