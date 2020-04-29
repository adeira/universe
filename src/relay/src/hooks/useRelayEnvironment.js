// @flow

import * as React from 'react';
import { ReactRelayContext } from 'react-relay';
import { invariant } from '@adeira/js';

import type { Environment } from '../runtimeTypes.flow';

export default function useRelayEnvironment(): Environment {
  const context = React.useContext(ReactRelayContext);
  invariant(
    context != null,
    'useRelayEnvironment: Expected to have found a Relay environment provided by' +
      'a `RelayEnvironmentProvider` component or `QueryRenderer`. This usually means that' +
      'useRelayEnvironment was used in a component that is not a descendant of these components. ' +
      'Please make sure a `RelayEnvironmentProvider` has been rendered somewhere as a parent of ' +
      'your component. It should be defined only once in the whole application.',
  );
  // $FlowFixMe errors after upgrading to relay 9.1.0
  return context.environment;
}
