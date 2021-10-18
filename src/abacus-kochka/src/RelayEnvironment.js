// @flow

import { createEnvironment, createNetworkFetcher, type Environment } from '@adeira/relay';

const RelayEnvironment: Environment = createEnvironment({
  fetchFn: createNetworkFetcher('https://abacus.kochka.com.mx/graphql'),
});

export default RelayEnvironment;
