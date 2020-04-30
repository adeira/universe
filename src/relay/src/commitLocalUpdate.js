// @flow

import { commitLocalUpdate as _commitLocalUpdate } from 'react-relay';
import type { StoreUpdater } from 'relay-runtime';

import type { Environment } from './runtimeTypes.flow';

/**
 * The first parameter `environment` should be from `props.relay.environment`
 * to ensure the update is performed in the correct environment.
 */
export default function commitLocalUpdate(environment: Environment, updater: StoreUpdater) {
  return _commitLocalUpdate(environment, updater);
}
