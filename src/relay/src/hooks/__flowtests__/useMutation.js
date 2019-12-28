// @flow

import { useMutation, graphql } from '../index';

const mutation = graphql`
  mutation useMutation {
    __typename
  }
`;

module.exports = {
  validUsage: () => {
    return function TestComponent() {
      const [isMutationPending, executeMutation] = useMutation(mutation);
      (isMutationPending: boolean);
      (executeMutation: ({|
        onCompleted: () => void,
      |}) => void);

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
  invalidUsage: () => {
    return function TestComponent() {
      const [, executeMutation] = useMutation(mutation);

      // $FlowExpectedError: property onCompleted is missing
      executeMutation({
        variables: {},
      });

      // $FlowExpectedError: property onCompleted is missing, property wtfIsThis is missing in HookMutationConfig
      executeMutation({
        wtfIsThis: {},
      });
    };
  },
};
