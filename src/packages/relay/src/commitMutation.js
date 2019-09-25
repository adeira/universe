// @flow

import { commitMutation as _commitMutation } from 'react-relay';

import type {
  Variables,
  GraphQLTaggedNode,
  DeclarativeMutationConfig,
  RecordSourceSelectorProxy,
  Environment,
  Uploadables,
} from './types.flow';

opaque type SelectorData = $FlowFixMe;

type MutationParameters = {|
  +response: { +[key: string]: any, ... },
  +variables: Variables,
  +rawResponse?: { ... },
|};

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
export default function commitMutation<T: MutationParameters>(
  environment: Environment,
  config: Config<T>,
) {
  return _commitMutation(environment, config);
}
