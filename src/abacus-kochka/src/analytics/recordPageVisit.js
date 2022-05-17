// @flow

import { warning } from '@adeira/js';
import { commitMutation, graphql, type Environment } from '@adeira/relay';

import type { recordPageVisitAnalyticsMutation } from './__generated__/recordPageVisitAnalyticsMutation.graphql';

export default function recordPageVisit(environment: Environment) {
  const location = {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/Location
    // Example for: https://example.org:8080/foo/bar?q=baz#bang
    protocol: window.location.protocol, // https:
    hostname: window.location.hostname, // example.org
    port: window.location.port, // 8080
    pathname: window.location.pathname, // /foo/bar
    search: window.location.search, // ?q=baz
    hash: window.location.hash, // #bang
  };

  const screen = {
    height: String(window.screen.height), // 900
    width: String(window.screen.width), // 1440
    // Warning! Leave the optional chain here (screen.orientation is not supported in Safari):
    orientationType: window.screen.orientation?.type,
    orientationAngle: String(window.screen.orientation?.angle),
  };

  commitMutation<recordPageVisitAnalyticsMutation>(environment, {
    mutation: graphql`
      mutation recordPageVisitAnalyticsMutation(
        $userAgent: String
        $location: PageVisitInputLocation!
        $screen: PageVisitInputScreen!
      ) {
        analytics {
          recordPageVisit(input: { userAgent: $userAgent, location: $location, screen: $screen }) {
            success
          }
        }
      }
    `,
    variables: {
      userAgent: window.navigator.userAgent,
      location,
      screen,
    },
    onCompleted({
      analytics: {
        recordPageVisit: { success },
      },
    }) {
      warning(success, 'could not perform analytics query');
    },
  });
}
