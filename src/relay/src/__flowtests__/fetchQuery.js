// @flow

import { createLocalEnvironment, fetchQuery, graphql } from '../index';

const environment = createLocalEnvironment();
const query = graphql`
  mutation fetchQuery {
    __typename
  }
`;
const variables = {};

module.exports = ({
  validUsage: () => {
    return fetchQuery(environment, query);
  },
  validUsagePromise: () => {
    return fetchQuery(environment, query, variables).toPromise();
  },
  validUsageObservable: () => {
    return fetchQuery(environment, query, variables).subscribe({
      next: () => {},
    });
  },

  // Invalid usages:
  missingQuery: () => {
    // $FlowExpectedError[incompatible-call]: missing query
    return fetchQuery(environment);
  },
  invalidObservable: () => {
    // $FlowExpectedError[incompatible-call]: wtf
    return fetchQuery(environment, query).subscribe({
      wtf: () => {},
    });
  },
}: $FlowFixMe);
