// @flow

import * as React from 'react';
import { ReactRelayContext } from 'react-relay';

import type { Environment } from './types.flow';

const { useMemo } = React;

type Props = $ReadOnly<{|
  +children: React.Node,
  +environment: Environment,
|}>;

// Please note: we currently do not expose 'ReactRelayContext.Consumer' because it seems to be unnecessary.
export default function RelayEnvironmentProvider(props: Props): React.Node {
  const { children, environment } = props;
  const context = useMemo(() => ({ environment }), [environment]);
  return <ReactRelayContext.Provider value={context}>{children}</ReactRelayContext.Provider>;
}
