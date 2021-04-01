// @flow

import { useLazyLoadQuery, graphql } from '../index';

const query = graphql`
  query useLazyLoadQuery {
    __typename
  }
`;

type QueryVariables = {};

type QueryTypeMock = {
  +variables: {},
  +response: {},
};

module.exports = {
  validUsage: (): (() => void) => {
    return function TestComponent() {
      useLazyLoadQuery<QueryVariables, QueryTypeMock>(query);
      useLazyLoadQuery<QueryVariables, QueryTypeMock>(query, Object.freeze({}));
    };
  },

  // Invalid usages:
  invalidUsage: (): (() => void) => {
    return function TestComponent() {
      // $FlowExpectedError[incompatible-call]: should be an object
      useLazyLoadQuery<QueryVariables, QueryTypeMock>(query, 'invalid');
    };
  },
};
