// @flow

import { createLocalEnvironment, fetchQuery, graphql } from '../index';

const environment = createLocalEnvironment();
const query = graphql`
  mutation fetchQuery {
    __typename
  }
`;
const variables = {};

module.exports = {
  validUsage: () => {
    return fetchQuery(environment, query, variables);
  },

  // Invalid usages:
  missingVariables: () => {
    // $FlowExpectedError: Cannot call fetchQuery because function [1] requires another argument.
    return fetchQuery(environment, query);
  },
};
