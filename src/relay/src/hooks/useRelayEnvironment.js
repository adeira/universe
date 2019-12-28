// @flow

import { useRelayEnvironment as _useRelayEnvironment } from 'react-relay/hooks';

import type { Environment } from '../runtimeTypes.flow';

export default function useRelayEnvironment(): Environment {
  return _useRelayEnvironment();
}
