// @flow

import { requestSubscription as _requestSubscription, type Environment } from 'react-relay';
import type { GraphQLSubscriptionConfig, Disposable } from 'relay-runtime';

type SubscriptionPayload = { +[key: string]: any, ... };

/**
 * The first parameter `environment` should be from `props.relay.environment`
 * to ensure the subscription is performed in the correct environment.
 */
export default function requestSubscription<T: SubscriptionPayload>(
  environment: Environment,
  config: GraphQLSubscriptionConfig<T>,
): Disposable {
  return _requestSubscription(environment, config);
}
