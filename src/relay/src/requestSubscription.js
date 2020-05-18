// @flow

import type { Disposable } from '@adeira/relay-runtime';
import { requestSubscription as _requestSubscription } from 'react-relay';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { Environment } from './runtimeTypes.flow';

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
