// @flow

import * as React from 'react';
import { ReactRelayContext } from 'react-relay';

import type { Environment } from './runtimeTypes.flow';

const { useMemo } = React;

type Props = $ReadOnly<{|
  +children: React.Node,
  // Environment is not optional here (even though in QR is) because it doesn't make sense to
  // use "env provider" without providing the environment.
  +environment: Environment,
|}>;

// Please note: we currently do not expose 'ReactRelayContext.Consumer' because it seems to be
// unnecessary. Simply use `useRelayEnvironment` if you need it but always prefer `props.relay`
// if available.
export default function RelayEnvironmentProvider(props: Props): React.Node {
  const { children, environment } = props;
  const context = useMemo(() => ({ environment }), [environment]);
  return <ReactRelayContext.Provider value={context}>{children}</ReactRelayContext.Provider>;
}
