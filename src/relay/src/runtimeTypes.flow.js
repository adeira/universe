// @flow

import type { Variables, RecordProxy } from '@adeira/relay-runtime';

import type { Disposable } from './types.flow';

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
  +lookup: SingularReaderSelector => Snapshot,
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
