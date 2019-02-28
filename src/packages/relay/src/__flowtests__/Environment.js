// @flow

import {
  graphql,
  commitMutation,
  requestSubscription,
  commitLocalUpdate,
  type RelayProp,
  type RefetchRelayProp,
  type PaginationRelayProp,
} from '../index';

type PropsA = {| +relay: RelayProp |};
type PropsB = {| +relay: RefetchRelayProp |};
type PropsC = {| +relay: PaginationRelayProp |};

type PropsInvalid = {|
  +relay: {| environment: number |},
|};

const mutationConfig = {
  mutation: graphql`
    mutation EnvironmentMutation {
      __typename
    }
  `,
  variables: {},
};

const subscriptionConfig = {
  subscription: graphql`
    subscription EnvironmentSubscription {
      __typename
    }
  `,
  variables: {},
};

const localUpdater = () => {};

module.exports = {
  commitMutation: {
    correctUsageA(props: PropsA) {
      return commitMutation(props.relay.environment, mutationConfig);
    },
    correctUsageB(props: PropsB) {
      return commitMutation(props.relay.environment, mutationConfig);
    },
    correctUsageC(props: PropsC) {
      return commitMutation(props.relay.environment, mutationConfig);
    },
    incorrectUsage(props: PropsInvalid) {
      // $FlowExpectedError: this environment is invalid and should not be accepted
      return commitMutation(props.relay.environment, mutationConfig);
    },
  },
  requestSubscription: {
    correctUsageA(props: PropsA) {
      return requestSubscription(props.relay.environment, subscriptionConfig);
    },
    correctUsageB(props: PropsB) {
      return requestSubscription(props.relay.environment, subscriptionConfig);
    },
    correctUsageC(props: PropsC) {
      return requestSubscription(props.relay.environment, subscriptionConfig);
    },
    incorrectUsage(props: PropsInvalid) {
      // $FlowExpectedError: this environment is invalid and should not be accepted
      return requestSubscription(props.relay.environment, subscriptionConfig);
    },
  },
  commitLocalUpdate: {
    correctUsageA(props: PropsA) {
      return commitLocalUpdate(props.relay.environment, localUpdater);
    },
    correctUsageB(props: PropsB) {
      return commitLocalUpdate(props.relay.environment, localUpdater);
    },
    correctUsageC(props: PropsC) {
      return commitLocalUpdate(props.relay.environment, localUpdater);
    },
    incorrectUsage(props: PropsInvalid) {
      // $FlowExpectedError: this environment is invalid and should not be accepted
      return commitLocalUpdate(props.relay.environment, localUpdater);
    },
  },
};
