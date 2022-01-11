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
      "ConnectionHandler",
      "createEnvironment",
      "createFragmentContainer",
      "createLocalEnvironment",
      "createNetworkFetcher",
      "createPaginationContainer",
      "createRefetchContainer",
      "EntryPointContainer",
      "fetchQuery",
      "FetchResponseError",
      "FetchTimeoutError",
      "getDataFromRequest",
      "graphql",
      "loadEntryPoint",
      "loadQuery",
      "LocalQueryRenderer",
      "QueryRenderer",
      "readInlineData",
      "RelayEnvironmentProvider",
      "RelayLogger",
      "RelayRequiredFieldLogger",
      "requestSubscription",
      "useEntryPointLoader",
      "useFragment",
      "useLazyLoadQuery",
      "useMutation",
      "usePaginationFragment",
      "usePreloadedQuery",
      "useQueryLoader",
      "useRefetchableFragment",
      "useRelayEnvironment",
      "useSubscribeToInvalidationState",
      "useSubscription",
    ]
  `);
});
