// @flow

import { requestSubscription as _requestSubscription } from 'react-relay';

import type {
  Variables,
  GraphQLTaggedNode,
  DeclarativeMutationConfig,
  Environment,
  RecordSourceSelectorProxy,
} from './types.flow';

opaque type SelectorData = $FlowFixMe;

type Config = {|
  +subscription: GraphQLTaggedNode,
  +variables: Variables,
  +onCompleted?: ?() => void,
  +onError?: ?(error: Error) => void,
  +onNext?: ?(response: ?Object) => void,
  +updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
  +configs?: $ReadOnlyArray<DeclarativeMutationConfig>,
|};

/**
 * The first parameter `environment` should be from `props.relay.environment`
 * to ensure the subscription is performed in the correct environment.
 */
export default function requestSubscription(
  environment: Environment,
  config: Config,
) {
  return _requestSubscription(environment, config);
}
