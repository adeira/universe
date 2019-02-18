// @flow

import { commitMutation, graphql } from '../index';
import DefaultEnvironment from '../DefaultEnvironment';

module.exports = {
  validMutation() {
    return commitMutation(DefaultEnvironment, {
      mutation: graphql`
        mutation commitMutation {
          __typename
        }
      `,
      variables: {
        aaa: 111,
      },
    });
  },

  // Invalid usages:
  missingVariables() {
    // $FlowExpectedError: variables are missing
    return commitMutation(DefaultEnvironment, {
      mutation: graphql`
        mutation commitMutation {
          __typename
        }
      `,
    });
  },
};
