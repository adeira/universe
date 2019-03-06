// @flow

import { commitMutation as _commitMutation } from 'react-relay';

import type {
  Variables,
  GraphQLTaggedNode,
  DeclarativeMutationConfig,
  Environment,
  RecordSourceSelectorProxy,
} from './types.flow';

opaque type SelectorData = $FlowFixMe;

type Config = {|
  +mutation: GraphQLTaggedNode,
  +variables: Variables,
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
  environment: Environment,
  config: Config,
) {
  return _commitMutation(environment, config);
}
