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

export type MutationParameters = {
  +response: { +[key: string]: any, ... },
  +variables: Variables,
  +rawResponse?: { ... },
};

// See https://github.com/facebook/relay/blob/9ee5a52ad8e385bae6e48bb97922006cc6f83bc0/packages/relay-runtime/mutations/commitMutation.js
type MutationConfig<T: MutationParameters> = {
  +mutation: GraphQLTaggedNode,
  +variables: T['variables'],
  // TODO: 2 kinds of errors? What about changing the interface a little bit to make it more obvious?
  +onCompleted?: ?(response: T['response'], errors: ?$ReadOnlyArray<Error>) => void,
  +onError?: ?(error: Error) => void,
  +onUnsubscribe?: ?() => void,
  +optimisticResponse?: T['rawResponse'],
  +optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: T['response']) => void,
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

type DisabledConfigProps<T> = {
  +onCompleted: ?(response: T['response'], errors: ?$ReadOnlyArray<Error>) => void,
  +onError: ?(error: Error) => void,
};

type PromisifiedMutationConfig<T> = $Rest<MutationConfig<T>, DisabledConfigProps<T>>;

/**
 * commitMutation function wrapped in Promise
 *
 * More convenient way for the most use cases, but be aware of implications:
 * https://github.com/facebook/relay/issues/1822#issuecomment-304576683
 *
 * Notes:
 * - Promise is successfully resolved even when you get errors from server - you might still get partial data.
 * - You should also never rely on these errors. Instead, make errors part of your schema if possible.
 */
export function commitMutationAsync<T: MutationParameters>(
  environment: Environment,
  config: PromisifiedMutationConfig<T>,
): Promise<{ +response: T['response'], +errors: ?$ReadOnlyArray<Error> }> {
  return new Promise((resolve, reject) => {
    const enhancedConfig = {
      ...config,
      onCompleted: (response: T['response'], errors: ?$ReadOnlyArray<Error>) =>
        resolve({ response, errors }),
      onError: (error: Error) => reject(error),
    };

    commitMutation<T>(environment, enhancedConfig);
  });
}
