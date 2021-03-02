// @flow

import * as publicExports from '../index';

it('exports only what we want to export', () => {
  // this is to make sure we are always exporting the subset we want to
  expect(Object.keys(publicExports)).toMatchInlineSnapshot(`
    Array [
      "FetchResponseError",
      "FetchTimeoutError",
      "createEnvironment",
      "createLocalEnvironment",
      "createNetworkFetcher",
      "getDataFromRequest",
      "RelayDebugLogger",
      "RelayEagerLogger",
      "RelayLazyLogger",
      "commitLocalUpdate",
      "commitMutation",
      "commitMutationAsync",
      "createFragmentContainer",
      "createPaginationContainer",
      "createRefetchContainer",
      "fetchQuery",
      "LocalQueryRenderer",
      "QueryRenderer",
      "requestSubscription",
      "graphql",
      "readInlineData",
      "ConnectionHandler",
      "RelayEnvironmentProvider",
      "useMutation",
      "useRelayEnvironment",
    ]
  `);
});
