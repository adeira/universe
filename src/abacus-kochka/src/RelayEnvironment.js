// @flow

import { createEnvironment, createNetworkFetcher, type Environment } from '@adeira/relay';

import constants from './constants';

const RelayEnvironment: Environment = createEnvironment({
  fetchFn: createNetworkFetcher(constants.graphqlServerURL),
});

export default RelayEnvironment;
