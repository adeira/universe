// @flow

import { warning } from '@adeira/js';
import { commitMutation, graphql, type Environment } from '@adeira/relay';

import type { recordPageVisitAnalyticsMutation } from './__generated__/recordPageVisitAnalyticsMutation.graphql';

export default function recordPageVisit(environment: Environment) {
  commitMutation<recordPageVisitAnalyticsMutation>(environment, {
    mutation: graphql`
      mutation recordPageVisitAnalyticsMutation($userAgent: String, $locationHref: String) {
        analytics {
          recordPageVisit(input: { userAgent: $userAgent, locationHref: $locationHref }) {
            success
          }
        }
      }
    `,
    variables: {
      userAgent: window.navigator.userAgent,
      locationHref: window.location.href,
    },
    onCompleted() {
      warning(false, 'Analytics query completed (TODO).');
    },
  });
}
