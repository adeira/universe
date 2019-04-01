// @flow

import {
  requestSubscription,
  createEnvironment,
  graphql,
  type Disposable,
} from '../index';

module.exports = {
  validUsage: () => {
    const subscription: Disposable = requestSubscription(
      createEnvironment({
        fetchFn: () => false,
      }),
      {
        subscription: graphql`
          subscription Disposable {
            __typename
          }
        `,
        variables: {
          aaa: 111,
        },
      },
    );
    return subscription;
  },
  invalidUsage: () => {
    // $FlowExpectedError: returns `Disposable` and not `number`
    const subscription: number = requestSubscription(
      createEnvironment({
        fetchFn: () => false,
      }),
      {
        subscription: graphql`
          subscription Disposable {
            __typename
          }
        `,
        variables: {
          aaa: 111,
        },
      },
    );
    return subscription;
  },
};
