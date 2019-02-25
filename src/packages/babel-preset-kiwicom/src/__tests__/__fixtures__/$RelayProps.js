// @flow

type $FragmentRef<T> = {
  +$fragmentRefs: $PropertyType<T, '$refType'>,
};

// This code used to be very broken, see: https://github.com/babel/babel/issues/9514
//
// I am leaving it here to make sure it still works as expected.

// prettier-ignore
export type $RelayProps<Props, RelayPropT> = $ObjMap<
  $Diff<Props, { relay: RelayPropT | void }>,
  (<T: () => void>( T) =>  T) &
  (<T: { +$refType: any }>( T) =>  $FragmentRef<T>) &
  (<T: { +$refType: any }>(?T) => ?$FragmentRef<T>) &
  (<T: { +$refType: any }>( $ReadOnlyArray< T>) =>  $ReadOnlyArray< $FragmentRef<T>>) &
  (<T: { +$refType: any }>(?$ReadOnlyArray< T>) => ?$ReadOnlyArray< $FragmentRef<T>>) &
  (<T: { +$refType: any }>( $ReadOnlyArray<?T>) =>  $ReadOnlyArray<?$FragmentRef<T>>) &
  (<T: { +$refType: any }>(?$ReadOnlyArray<?T>) => ?$ReadOnlyArray<?$FragmentRef<T>>) &
  (<T>(T) => T)
>
