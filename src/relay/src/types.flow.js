// @flow

import type { ComponentType } from 'react';
import type { GraphQLTaggedNode } from 'relay-runtime';

import type { RelayProp } from './createFragmentContainer';
import type { RefetchRelayProp } from './createRefetchContainer';
import type { PaginationRelayProp } from './createPaginationContainer';

// See: https://github.com/facebook/flow/issues/8627
export type Variables = {| +[string]: $FlowFixMe |};

export type RequestNode = $FlowFixMe;

// The type of a graphql`...` tagged template expression.

export type FragmentSpec = { [key: string]: GraphQLTaggedNode, ... };

type $FragmentRef<T> = { +$fragmentRefs: $PropertyType<T, '$refType'>, ... };

// prettier-ignore
export type $RelayProps<Props, RelayPropT> = $ObjMap<
  $Diff<Props, { relay: RelayPropT | void, ... }>,
  // We currently don't know how to preserve Function and Object type
  // correctly while using `createFragmentContainer`, see:
  // https://github.com/facebook/relay/commit/2141964373703dcaa9bd49aa3cd2e9efdd09425f
  (<T: () => void>( T) =>  T) &
  (<T: { +$refType: any, ... }>( T) =>  $FragmentRef<T>) &
  (<T: { +$refType: any, ... }>(?T) => ?$FragmentRef<T>) &
  (<T: { +$refType: any, ... }>( $ReadOnlyArray< T>) =>  $ReadOnlyArray< $FragmentRef<T>>) &
  (<T: { +$refType: any, ... }>(?$ReadOnlyArray< T>) => ?$ReadOnlyArray< $FragmentRef<T>>) &
  (<T: { +$refType: any, ... }>( $ReadOnlyArray<?T>) =>  $ReadOnlyArray<?$FragmentRef<T>>) &
  (<T: { +$refType: any, ... }>(?$ReadOnlyArray<?T>) => ?$ReadOnlyArray<?$FragmentRef<T>>) &
  (<T>(T) => T)
>

/**
 * @deprecated use `useFragment` which doesn't need explicit Flow types
 */
export type FragmentContainerType<Props> = ComponentType<$RelayProps<Props, RelayProp>>;

/**
 * @deprecated use `useRefetchableFragment` which doesn't need explicit Flow types
 */
export type RefetchContainerType<Props> = ComponentType<$RelayProps<Props, RefetchRelayProp>>;

/**
 * @deprecated use `usePaginationFragment` which doesn't need explicit Flow types
 */
export type PaginationContainerType<Props> = ComponentType<$RelayProps<Props, PaginationRelayProp>>;
