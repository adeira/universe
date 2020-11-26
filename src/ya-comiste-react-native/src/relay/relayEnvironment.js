// @flow

import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function fetchQuery(operation, variables) {
  // TODO: specify JSON.schema
  if (variables.entrypointID === 'com.yaComiste.Explore') {
    return require('./mocks/com.yaComiste.Explore.json');
  } else if (variables.entrypointID === 'com.yaComiste.ExploreDetail') {
    return require('./mocks/com.yaComiste.ExploreDetail.json');
  }
  throw new Error(`Relay: unknown operation: ${operation.name}`);
}

export default (new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
}): Environment);
