// @flow

import { commitMutation as _commitMutation } from 'react-relay';

import type {
  Variables,
  GraphQLTaggedNode,
  DeclarativeMutationConfig,
  Uploadables,
} from './types.flow';
import type { Environment, RecordSourceSelectorProxy } from './runtimeTypes.flow';

opaque type SelectorData = $FlowFixMe;

type MutationParameters = {|
  +response: { +[key: string]: any, ... },
  +variables: Variables,
  +rawResponse?: { ... },
|};

// See https://github.com/facebook/relay/blob/9ee5a52ad8e385bae6e48bb97922006cc6f83bc0/packages/relay-runtime/mutations/commitMutation.js
type Config<T: MutationParameters> = {|
  +mutation: GraphQLTaggedNode,
  +variables: $ElementType<T, 'variables'>,
  // TODO: 2 kinds of errors? What about changing the interface a little bit to make it more obvious?
  +onCompleted?: ?(response: $ElementType<T, 'response'>, errors: ?$ReadOnlyArray<Error>) => void,
  +onError?: ?(error: Error) => void,
  +optimisticResponse?: $ElementType<{| +rawResponse?: { ... }, ...T |}, 'rawResponse'>,
  +optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
  +uploadables?: Uploadables,
  +configs?: $ReadOnlyArray<DeclarativeMutationConfig>,
|};

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
export function commitMutation<T: MutationParameters>(environment: Environment, config: Config<T>) {
  return _commitMutation(environment, config);
}

type DisabledConfigProps<T> = {|
  +onCompleted: ?(response: $ElementType<T, 'response'>, errors: ?$ReadOnlyArray<Error>) => void,
  +onError: ?(error: Error) => void,
|};

type PromisifiedMutationConfig<T> = $Rest<Config<T>, DisabledConfigProps<T>>;

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
): Promise<{| +response: $ElementType<T, 'response'>, +errors: ?$ReadOnlyArray<Error> |}> {
  return new Promise((resolve, reject) => {
    const enhancedConfig = {
      ...config,
      onCompleted: (response: $ElementType<T, 'response'>, errors: ?$ReadOnlyArray<Error>) =>
        resolve({ response, errors }),
      onError: (error: Error) => reject(error),
    };

    commitMutation<T>(environment, enhancedConfig);
  });
}
