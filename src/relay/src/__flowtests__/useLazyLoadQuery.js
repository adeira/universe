// @flow

import { useLazyLoadQuery, graphql } from '../index';

/* $FlowFixMe[incompatible-call] This comment suppresses an error when
 * upgrading Flow to version 0.199.1. To see the error delete this comment
 * and run Flow. */
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
