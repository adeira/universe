// @flow

type $FragmentRef<T> = {
  +$fragmentRefs: $PropertyType<T, '$refType'>,
};

// This is now being completely fucked in Flow environment, see issue:
//   https://github.com/babel/babel/issues/9514
//
// Please leave it here so we know when it's fixed.

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
