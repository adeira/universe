// @flow

import {
  graphql,
  commitMutation,
  requestSubscription,
  commitLocalUpdate,
  createEnvironment,
  type Disposable,
  type RelayPaginationProp,
  type RelayRefetchProp,
  type RelayProp,
} from '../index';

type PropsA = { +relay: RelayProp };
type PropsB = { +relay: RelayRefetchProp };
type PropsC = { +relay: RelayPaginationProp };

type PropsInvalid = {
  +relay: { environment: number },
};

// this returns Environment which should never be used directly
const ManuallyCreatedEnvironment = createEnvironment({
  fetchFn: () => {},
});

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

const localUpdater = (store) => {
  const favorite = store.get('unique:ID');
  if (favorite) {
    favorite.setValue(false, 'isNew');
  }
};

module.exports = ({
  commitMutation: {
    correctUsageA(props: PropsA): Disposable {
      return commitMutation(props.relay.environment, mutationConfig);
    },
    correctUsageB(props: PropsB): Disposable {
      return commitMutation(props.relay.environment, mutationConfig);
    },
    correctUsageC(props: PropsC): Disposable {
      return commitMutation(props.relay.environment, mutationConfig);
    },
    incorrectUsageA(props: PropsInvalid): Disposable {
      // $FlowExpectedError[incompatible-call]: this environment is invalid and should not be accepted
      return commitMutation(props.relay.environment, mutationConfig);
    },
    incorrectUsageB(): Disposable {
      // environment _should_ be passed down from props (currently no error)
      return commitMutation(ManuallyCreatedEnvironment, mutationConfig);
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
    incorrectUsageA(props: PropsInvalid) {
      // $FlowExpectedError[incompatible-call]: this environment is invalid and should not be accepted
      return requestSubscription(props.relay.environment, subscriptionConfig);
    },
    incorrectUsageB() {
      return requestSubscription(
        // environment _should_ be passed down from props (currently no error)
        ManuallyCreatedEnvironment,
        subscriptionConfig,
      );
    },
  },
  commitLocalUpdate: {
    correctUsageA(props: PropsA): void {
      return commitLocalUpdate(props.relay.environment, localUpdater);
    },
    correctUsageB(props: PropsB): void {
      return commitLocalUpdate(props.relay.environment, localUpdater);
    },
    correctUsageC(props: PropsC): void {
      return commitLocalUpdate(props.relay.environment, localUpdater);
    },
    incorrectUsageA(props: PropsInvalid): void {
      // $FlowExpectedError[incompatible-call]: this environment is invalid and should not be accepted
      return commitLocalUpdate(props.relay.environment, localUpdater);
    },
    incorrectUsageB(): void {
      // environment _should_ be passed down from props (currently no error)
      return commitLocalUpdate(ManuallyCreatedEnvironment, localUpdater);
    },
  },
}: $FlowFixMe);
