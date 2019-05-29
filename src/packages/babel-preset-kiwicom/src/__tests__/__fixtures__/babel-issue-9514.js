// @flow

// See: https://github.com/babel/babel/issues/9514

type $FragmentRef<T> = { +$fragmentRefs: $PropertyType<T, '$refType'>, ... };

// prettier-ignore
export type $RelayProps<Props, RelayPropT> = $ObjMap<
  $Diff<Props, { relay: RelayPropT | void, ... }>,
  (<T: () => void>( T) =>  T) &
  (<T: { +$refType: any, ... }>( T) =>  $FragmentRef<T>) &
  (<T: { +$refType: any, ... }>(?T) => ?$FragmentRef<T>) &
  (<T: { +$refType: any, ... }>( $ReadOnlyArray< T>) =>  $ReadOnlyArray< $FragmentRef<T>>) &
  (<T: { +$refType: any, ... }>(?$ReadOnlyArray< T>) => ?$ReadOnlyArray< $FragmentRef<T>>) &
  (<T: { +$refType: any, ... }>( $ReadOnlyArray<?T>) =>  $ReadOnlyArray<?$FragmentRef<T>>) &
  (<T: { +$refType: any, ... }>(?$ReadOnlyArray<?T>) => ?$ReadOnlyArray<?$FragmentRef<T>>) &
  (<T>(T) => T)
>
