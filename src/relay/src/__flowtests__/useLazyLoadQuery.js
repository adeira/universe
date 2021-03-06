// @flow

import { useLazyLoadQuery, graphql } from '../index';

const query = graphql`
  query useLazyLoadQuery {
    __typename
  }
`;

type QueryTypeMock = {|
  +variables: {||},
  +response: {||},
|};

module.exports = {
  validUsage: (): (() => void) => {
    return function TestComponent() {
      useLazyLoadQuery<QueryTypeMock>(query);
      useLazyLoadQuery<QueryTypeMock>(query, {});
    };
  },

  // Invalid usages:
  invalidUsage: (): (() => void) => {
    return function TestComponent() {
      // $FlowExpectedError[incompatible-call]: should be an object
      useLazyLoadQuery<QueryTypeMock>(query, 'invalid');
    };
  },
};
