// @flow

import type { RequestNode as _RequestNode } from 'relay-runtime'; // TODO: remove

export type RequestNode = _RequestNode;
export type CacheConfig = {|
  +force?: ?boolean,
  // incomplete on purpose
|};
export type Uploadables = { [key: string]: File | Blob };
export type Variables = { [name: string]: $FlowFixMe };

type ConcreteArgumentDefinition = $FlowFixMe;
type ConcreteSelection = $FlowFixMe;

export type Disposable = {|
  +dispose: () => void,
|};

type ConcreteFragment = {
  +argumentDefinitions: Array<ConcreteArgumentDefinition>,
  +kind: 'Fragment',
  +metadata: ?{ [key: string]: mixed },
  +name: string,
  +selections: Array<ConcreteSelection>,
  +type: string,
};

export type GraphQLTaggedNode = () => ConcreteFragment;
export type GeneratedNodeMap = { [key: string]: GraphQLTaggedNode };

/*::

// So, there is currently an issue with Babel Parser which turns these lines
// into complete mess when targeting Flow. Issue reported:
//   https://github.com/babel/babel/issues/9514

type $FragmentRef<T> = {
  +$fragmentRefs: $PropertyType<T, '$refType'>,
};

// prettier-ignore
export type $RelayProps<Props, RelayPropT> = $ObjMap<
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

*/
