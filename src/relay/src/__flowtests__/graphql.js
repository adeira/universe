// @flow

import { graphql } from '../index';

module.exports = ({
  correctUsage() {
    return graphql`
      query graphql_correctUsage {
        __typename
      }
    `;
  },
  correctUsageUnusual() {
    return graphql(['correct']);
  },
  incorrectUsage() {
    // $FlowExpectedError[incompatible-call]: input should be only string
    return graphql([1, 2]);
  },
}: $FlowFixMe);
