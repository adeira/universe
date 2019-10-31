// @flow

import type { Variables, Disposable } from './types.flow';

type DataID = string;

/*
 * An individual cached graph object.
 */
type Record = {| +[key: string]: mixed |};

/**
 * A collection of records keyed by id.
 */
export type RecordMap = {| +[dataID: DataID]: ?Record |};

type ReaderFragment = {|
  +kind: 'Fragment',
  +name: string,
  +type: string,
  +metadata: ?{|
    +connection?: $ReadOnlyArray<$FlowFixMe>,
    +mask?: boolean,
    +plural?: boolean,
    +refetch?: $FlowFixMe,
  |},
  +argumentDefinitions: $ReadOnlyArray<$FlowFixMe>,
  +selections: $ReadOnlyArray<$FlowFixMe>,
|};

/*
 * A selector defines the starting point for a traversal into the graph for the
 * purposes of targeting a subgraph.
 */
type NormalizationSelector = {|
  +dataID: DataID,
  +node: $FlowFixMe,
  +variables: Variables,
|};

type SingularReaderSelector = {|
  +kind: 'SingularReaderSelector',
  +dataID: DataID,
  +node: ReaderFragment,
  +owner: $FlowFixMe,
  +variables: Variables,
|};

/**
 * A representation of a selector and its results at a particular point in time.
 */
type TypedSnapshot<TData> = {|
  +data: TData,
  +isMissingData: boolean,
  +seenRecords: $FlowFixMe,
  +selector: SingularReaderSelector,
|};

export type Snapshot = TypedSnapshot<?{| +[key: string]: mixed |}>;

// See:
// - https://facebook.github.io/relay/docs/en/next/relay-store.html
// - https://relay.dev/docs/en/next/runtime-architecture#store-operations
type RelayModernStore = {|
  +getSource: () => RecordSourceSelectorProxy,
  +lookup: SingularReaderSelector => Snapshot,
  +retain: NormalizationSelector => Disposable,
  // improve as needed
|};

export type Environment = {|
  +getStore: () => RelayModernStore,
  // improve as needed
|};

export type RecordSourceSelectorProxy = {|
  +create: (dataID: string, typeName: string) => RecordProxy,
  +delete: (dataID: string) => void,
  +get: (dataID: string) => ?RecordProxy,
  +getRoot: () => RecordProxy,
  +getRootField: (fieldName: string) => ?RecordProxy,
  +getPluralRootField: (fieldName: string) => ?$ReadOnlyArray<?RecordProxy>,
  +toJSON: () => RecordMap,
|};

type AnyObject = { +[key: string]: any, ... };

type RecordProxy = $ReadOnly<{|
  copyFieldsFrom: (sourceRecord: RecordProxy) => void,
  getDataID: () => string,
  getLinkedRecord: (name: string, args?: ?AnyObject) => ?RecordProxy,
  getLinkedRecords: (name: string, args?: ?AnyObject) => ?$ReadOnlyArray<?RecordProxy>,
  getOrCreateLinkedRecord: (name: string, typeName: string, args?: ?AnyObject) => RecordProxy,
  getType: () => string,
  getValue: (name: string, args?: ?AnyObject) => mixed,
  setLinkedRecord: (record: RecordProxy, name: string, args?: ?AnyObject) => RecordProxy,
  setLinkedRecords: (
    records: $ReadOnlyArray<?RecordProxy>,
    name: string,
    args?: ?AnyObject,
  ) => RecordProxy,
  setValue: (value: mixed, name: string, args?: ?AnyObject) => RecordProxy,
|}>;
