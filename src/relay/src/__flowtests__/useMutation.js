// @flow

import { useMutation, graphql, type Disposable } from '../index';

const mutation = graphql`
  mutation useMutation {
    __typename
  }
`;

module.exports = {
  validUsage: (): (() => void) => {
    return function TestComponent() {
      // eslint-disable-next-line relay/generated-flow-types -- discovered when upgrading Relay Eslint plugin, FIXME
      const [executeMutation, isMutationPending] = useMutation<$FlowFixMe>(mutation);
      (executeMutation: ({
        onCompleted: () => void,
      }) => Disposable);
      (isMutationPending: boolean);

      executeMutation({
        onCompleted: () => {},
      });

      executeMutation({
        variables: {},
        onCompleted: () => {},
        onUnsubscribe: () => {},
      });
    };
  },

  // Invalid usages:
  invalidUsage: (): (() => void) => {
    return function TestComponent() {
      // eslint-disable-next-line relay/generated-flow-types -- discovered when upgrading Relay Eslint plugin, FIXME
      const [executeMutation] = useMutation<$FlowFixMe>(mutation);

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
