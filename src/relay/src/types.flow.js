// @flow

import * as React from 'react';
import type { Variables, GraphQLTaggedNode } from '@adeira/relay-runtime';

import type { RelayProp } from './createFragmentContainer';
import type { RefetchRelayProp } from './createRefetchContainer';
import type { PaginationRelayProp } from './createPaginationContainer';

export type RequestNode = $FlowFixMe;
export type Uploadables = { +[key: string]: File | Blob, ... };

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

export type DeclarativeMutationConfig = RangeAddConfig | RangeDeleteConfig | NodeDeleteConfig;

// see: relay-runtime/mutations/RelayDeclarativeMutationConfig.js
type RangeOperation = 'append' | 'prepend';

opaque type RangeBehaviorsFunction = (connectionArgs: {
  [name: string]: $FlowFixMe,
  ...
}) => RangeOperation;

opaque type RangeBehaviorsObject = { [key: string]: RangeOperation, ... };

opaque type RangeBehaviors = RangeBehaviorsFunction | RangeBehaviorsObject;

type RangeAddConfig = {|
  +type: 'RANGE_ADD',
  +parentName?: string,
  +parentID?: string,
  +connectionInfo?: $ReadOnlyArray<{|
    +key: string,
    +filters?: Variables,
    +rangeBehavior: RangeOperation,
  |}>,
  +connectionName?: string,
  +edgeName: string,
  +rangeBehaviors?: RangeBehaviors,
|};

type RangeDeleteConfig = {|
  +type: 'RANGE_DELETE',
  +parentName?: string,
  +parentID?: string,
  +connectionKeys?: $ReadOnlyArray<{|
    +key: string,
    +filters?: Variables,
  |}>,
  +connectionName?: string,
  +deletedIDFieldName: string | $ReadOnlyArray<string>,
  +pathToConnection: $ReadOnlyArray<string>,
|};

type NodeDeleteConfig = {|
  +type: 'NODE_DELETE',
  +parentName?: string,
  +parentID?: string,
  +connectionName?: string,
  +deletedIDFieldName: string,
|};

export type FragmentContainerType<Props> = React.ComponentType<$RelayProps<Props, RelayProp>>;

export type RefetchContainerType<Props> = React.ComponentType<$RelayProps<Props, RefetchRelayProp>>;

export type PaginationContainerType<Props> = React.ComponentType<
  $RelayProps<Props, PaginationRelayProp>,
>;
