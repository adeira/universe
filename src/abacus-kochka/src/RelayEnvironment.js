// @flow

import { createEnvironment, createNetworkFetcher, type Environment } from '@adeira/relay';

const RelayEnvironment: Environment = createEnvironment({
  fetchFn: createNetworkFetcher(
    'http://localhost:5000/graphql', // TODO: HTTPS, better "abacus" domain
  ),
});

export default RelayEnvironment;
