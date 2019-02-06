// @flow

import Relay from 'react-relay';
import { TimeoutError as unstable_TimeoutError } from '@kiwicom/fetch'; // eslint-disable-line babel/camelcase

module.exports = {
  unstable_TimeoutError,
  createEnvironment: require('./createEnvironment'),
  createNetworkFetcher: require('./fetchers/createNetworkFetcher'),

  graphql,
  QueryRenderer: Relay.QueryRenderer,
  createFragmentContainer,
};

type ConcreteArgumentDefinition = $FlowFixMe;
type ConcreteSelection = $FlowFixMe;

type ConcreteFragment = {
  argumentDefinitions: Array<ConcreteArgumentDefinition>,
  kind: 'Fragment',
  metadata: ?{ [key: string]: mixed },
  name: string,
  selections: Array<ConcreteSelection>,
  type: string,
};

type Environment = $FlowFixMe;
type GraphQLTaggedNode = () => ConcreteFragment;
type GeneratedNodeMap = { [key: string]: GraphQLTaggedNode };

type RelayProp = {
  environment: Environment,
};

type $FragmentRef<T> = {
  +$fragmentRefs: $PropertyType<T, '$refType'>,
};

// prettier-ignore
type $RelayProps<Props, RelayPropT> = $ObjMap<
  $Diff<Props, { relay: RelayPropT | void }>,
  // We currently don't know how to preserve Function and Object type
  // correctly while using `createFragmentContainer`, see:
  // https://github.com/facebook/relay/commit/2141964373703dcaa9bd49aa3cd2e9efdd09425f
  (<T: () => void>( T) =>  T) &
  (<T: { +$refType: any }>( T) =>  $FragmentRef<T>) &
  (<T: { +$refType: any }>(?T) => ?$FragmentRef<T>) &
  (<T: { +$refType: any }>( $ReadOnlyArray< T>) =>  $ReadOnlyArray< $FragmentRef<T>>) &
  (<T: { +$refType: any }>(?$ReadOnlyArray< T>) => ?$ReadOnlyArray< $FragmentRef<T>>) &
  (<T: { +$refType: any }>( $ReadOnlyArray<?T>) =>  $ReadOnlyArray<?$FragmentRef<T>>) &
  (<T: { +$refType: any }>(?$ReadOnlyArray<?T>) => ?$ReadOnlyArray<?$FragmentRef<T>>) &
  // see: https://github.com/facebook/relay/blob/v1.7.0-rc.1/packages/react-relay/modern/ReactRelayTypes.js
  // see: https://github.com/sibelius/relay-modern-network-deep-dive/tree/master/flow-typed
  (<T>(T) => T)
>

function graphql(strings: Array<string>): GraphQLTaggedNode {
  return Relay.graphql(strings);
}

function createFragmentContainer<TComponent: React$ComponentType<any>>(
  Component: TComponent,
  fragmentSpec: GeneratedNodeMap, // this is intentionally different to force the best practices
): React$ComponentType<
  $RelayProps<React$ElementConfig<TComponent>, RelayProp>,
> {
  return Relay.createFragmentContainer(Component, fragmentSpec);
}
