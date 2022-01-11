// @flow

import { Environment as RelayEnvironment } from 'relay-runtime';
import type { Environment } from 'react-relay';

import createRelayStore from './createRelayStore';
import { RelayLogger, RelayRequiredFieldLogger } from './RelayLogger';

/**
 * This is just an alternative environment factory for LocalQueryRenderer. There is currently not
 * very much API around and should be extended as needed.
 */
export default function createLocalEnvironment(): Environment {
  // $FlowExpectedError[prop-missing]: Network is required in relay flow types
  return new RelayEnvironment({
    // notice this environment doesn't have network layer since it's not necessary
    log: RelayLogger,
    requiredFieldLogger: RelayRequiredFieldLogger,
    store: createRelayStore(),
  });
}
