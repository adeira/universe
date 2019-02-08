// @flow

import { graphql } from '../index';

module.exports = {
  correctUsage() {
    return graphql`correct usage`; // eslint-disable-line relay/graphql-syntax
  },
  correctUsageUnusual() {
    return graphql(['correct']);
  },
  incorrectUsage() {
    // $FlowExpectedError: input should be only string
    return graphql([1, 2]);
  },
};
