// @flow

import { commitMutation as _commitMutation, type Environment } from 'react-relay';
import type {
  GraphQLTaggedNode,
  Disposable,
  UploadableMap,
  RecordSourceSelectorProxy,
  DeclarativeMutationConfig,
} from 'relay-runtime';

import type { Variables } from './types.flow';

opaque type SelectorData = $FlowFixMe;

export type MutationParameters = {
  +response: { +[key: string]: any, ... },
  +variables: Variables,
  +rawResponse?: { ... },
};

// See https://github.com/facebook/relay/blob/9ee5a52ad8e385bae6e48bb97922006cc6f83bc0/packages/relay-runtime/mutations/commitMutation.js
type MutationConfig<T: MutationParameters> = {
  +mutation: GraphQLTaggedNode,
  +variables: $ElementType<T, 'variables'>,
  // TODO: 2 kinds of errors? What about changing the interface a little bit to make it more obvious?
  +onCompleted?: ?(response: $ElementType<T, 'response'>, errors: ?$ReadOnlyArray<Error>) => void,
  +onError?: ?(error: Error) => void,
  +onUnsubscribe?: ?() => void,
  +optimisticResponse?: $ElementType<{ +rawResponse?: { ... }, ...T }, 'rawResponse'>,
  +optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
  +uploadables?: UploadableMap,
  +configs?: $ReadOnlyArray<DeclarativeMutationConfig>,
};

/**
 * The first parameter `environment` should be from `props.relay.environment`
 * to ensure the mutation is performed in the correct environment.
 *
 * Correct usage of generated flow types for "commitMutation" function:
 *
 * import type { NamedMutation } from './__generated__/NamedMutation.graphql';
 *
 * commitMutation<NamedMutation>(...)
 */
export function commitMutation<T: MutationParameters>(
  environment: Environment,
  config: MutationConfig<T>,
): Disposable {
  // Let's stay with our flow types for now, since they are better than relay's at the moment.
  // One example is RangeBehaviorsFunction, where relay has: [name: string]: $FlowFixMe, while
  // we have the actual allowed rangebehaviors

  // $FlowExpectedError[incompatible-call]
  // $FlowExpectedError[incompatible-variance]
  // $FlowExpectedError[prop-missing]
  return _commitMutation(environment, config);
}
