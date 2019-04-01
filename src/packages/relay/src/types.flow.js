// @flow

export type RequestNode = $FlowFixMe;
export type Uploadables = { [key: string]: File | Blob };
export type Variables = { [name: string]: $FlowFixMe };

type ConcreteArgumentDefinition = $FlowFixMe;
type ConcreteSelection = $FlowFixMe;
export type Environment = {|
  // TODO: improve (?)
|};

export type Disposable = {|
  +dispose: () => void,
|};

// The type of a graphql`...` tagged template expression.
export opaque type GraphQLTaggedNode = {|
  +argumentDefinitions: $ReadOnlyArray<ConcreteArgumentDefinition>,
  +kind: 'Fragment',
  +metadata: ?{ [key: string]: mixed },
  +name: string,
  +selections: $ReadOnlyArray<ConcreteSelection>,
  +type: string,
|};

export type FragmentSpec = { [key: string]: GraphQLTaggedNode };

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
  (<T>(T) => T)
>

export type DeclarativeMutationConfig =
  | RangeAddConfig
  | RangeDeleteConfig
  | NodeDeleteConfig;

// see: relay-runtime/mutations/RelayDeclarativeMutationConfig.js
type RangeOperation = 'append' | 'ignore' | 'prepend';

opaque type RangeBehaviorsFunction = (connectionArgs: {
  [name: string]: $FlowFixMe,
}) => RangeOperation;

opaque type RangeBehaviorsObject = { [key: string]: RangeOperation };

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

// See: https://facebook.github.io/relay/docs/en/next/relay-store.html
export type RecordSourceSelectorProxy = {|
  +create: (dataID: string, typeName: string) => RecordProxy,
  +delete: (dataID: string) => void,
  +get: (dataID: string) => ?RecordProxy,
  +getRoot: () => RecordProxy,
  +getRootField: (fieldName: string) => ?RecordProxy,
  +getPluralRootField: (fieldName: string) => ?$ReadOnlyArray<?RecordProxy>,
|};

type RecordProxy = $ReadOnly<{|
  copyFieldsFrom: (sourceRecord: RecordProxy) => void,
  getDataID: () => string,
  getLinkedRecord: (name: string, args?: ?Object) => ?RecordProxy,
  getLinkedRecords: (
    name: string,
    args?: ?Object,
  ) => ?$ReadOnlyArray<?RecordProxy>,
  getOrCreateLinkedRecord: (
    name: string,
    typeName: string,
    args?: ?Object,
  ) => RecordProxy,
  getType: () => string,
  getValue: (name: string, args?: ?Object) => mixed,
  setLinkedRecord: (
    record: RecordProxy,
    name: string,
    args?: ?Object,
  ) => RecordProxy,
  setLinkedRecords: (
    records: $ReadOnlyArray<?RecordProxy>,
    name: string,
    args?: ?Object,
  ) => RecordProxy,
  setValue: (value: mixed, name: string, args?: ?Object) => RecordProxy,
|}>;
