// @flow

import { graphql, requestSubscription, type Disposable, type RelayProp } from '../index';

type Props = {| +relay: RelayProp |};

module.exports = {
  validUsage: (props: Props) => {
    const subscription: Disposable = requestSubscription(props.relay.environment, {
      subscription: graphql`
        subscription Disposable {
          __typename
        }
      `,
      variables: {
        aaa: 111,
      },
    });
    return subscription;
  },
  invalidUsage: (props: Props) => {
    // $FlowExpectedError: returns `Disposable` and not `number`
    const subscription: number = requestSubscription(props.relay.environment, {
      subscription: graphql`
        subscription Disposable {
          __typename
        }
      `,
      variables: {
        aaa: 111,
      },
    });
    return subscription;
  },
};
