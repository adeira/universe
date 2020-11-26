// @flow

import type { ComponentType } from 'react';
import type { Environment } from 'react-relay';

export type RelayProp = {|
  +environment: Environment,
|};

type $FragmentRef<T> = { +$fragmentRefs: $PropertyType<T, '$refType'>, ... };

// See: @adeira/relay
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

export type FragmentContainerType<Props> = ComponentType<$RelayProps<Props, RelayProp>>;
