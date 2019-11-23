// @flow

import { graphql, requestSubscription, type Disposable, type RelayProp } from '../index';

type Props = {| +relay: RelayProp |};

type SubscriptionTypeMock = any;

module.exports = {
  validUsage: (props: Props) => {
    const subscription: Disposable = requestSubscription<SubscriptionTypeMock>(
      props.relay.environment,
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
  invalidUsage: (props: Props) => {
    // $FlowExpectedError: returns `Disposable` and not `number`
    const subscription: number = requestSubscription<SubscriptionTypeMock>(
      props.relay.environment,
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
