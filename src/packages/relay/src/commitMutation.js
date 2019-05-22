// @flow

import { commitMutation as _commitMutation } from 'react-relay';

import type {
  Variables,
  GraphQLTaggedNode,
  DeclarativeMutationConfig,
  RecordSourceSelectorProxy,
  $EnvironmentFromProps,
} from './types.flow';

opaque type SelectorData = $FlowFixMe;

type Config = {|
  +mutation: GraphQLTaggedNode,
  +variables: Variables,
  // TODO: 2 kinds of errors? What about changing the interface a little bit to make it more obvious?
  +onCompleted?: ?(response: ?Object, errors: ?$ReadOnlyArray<Error>) => void,
  +onError?: ?(error: Error) => void,
  +optimisticResponse?: Object,
  +optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
  +configs?: $ReadOnlyArray<DeclarativeMutationConfig>,
|};

/**
 * The first parameter `environment` should be from `props.relay.environment`
 * to ensure the mutation is performed in the correct environment.
 */
export default function commitMutation(
  environment: $EnvironmentFromProps,
  config: Config,
) {
  return _commitMutation(environment, config);
}
