// @flow

import * as publicExports from '../index';

it('exports only what we want to export', () => {
  // this is to make sure we are always exporting the subset we want to
  expect(
    Object.keys(publicExports).sort((a, b) => {
      return a.localeCompare(b);
    }),
  ).toMatchInlineSnapshot(`
    Array [
      "commitLocalUpdate",
      "commitMutation",
      "commitMutationAsync",
      "ConnectionHandler",
      "createEnvironment",
      "createFragmentContainer",
      "createLocalEnvironment",
      "createNetworkFetcher",
      "createPaginationContainer",
      "createRefetchContainer",
      "fetchQuery",
      "FetchResponseError",
      "FetchTimeoutError",
      "getDataFromRequest",
      "graphql",
      "LocalQueryRenderer",
      "QueryRenderer",
      "readInlineData",
      "RelayDebugLogger",
      "RelayEagerLogger",
      "RelayEnvironmentProvider",
      "RelayLazyLogger",
      "requestSubscription",
      "useMutation",
      "useRelayEnvironment",
    ]
  `);
});
