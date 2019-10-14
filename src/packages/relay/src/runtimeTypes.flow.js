// @flow

import type { Variables } from './types.flow';

type DataID = string;

/*
 * An individual cached graph object.
 */
type Record = {| +[key: string]: mixed |};

/**
 * A collection of records keyed by id.
 */
export type RecordMap = {| +[dataID: DataID]: ?Record |};

/**
 * Represents a single operation used to processing and normalize runtime
 * request results.
 */
type NormalizationOperation = {|
  +kind: 'Operation',
  +name: string,
  +argumentDefinitions: $ReadOnlyArray<$FlowFixMe>,
  +selections: $ReadOnlyArray<$FlowFixMe>,
|};

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

/**
 * Contains the `text` (or persisted `id`) required for executing a common
 * GraphQL request.
 */
type RequestParameters =
  | {| ...BaseRequestParameters, +text: null, +id: string |}
  | {| ...BaseRequestParameters, +text: string, +id: null |};
type BaseRequestParameters = {|
  +name: string,
  +operationKind: 'mutation' | 'query' | 'subscription',
  +metadata: {| +[key: string]: mixed |},
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
 * Represents a common GraphQL request with `text` (or persisted `id`) can be
 * used to execute it, an `operation` containing information to normalize the
 * results, and a `fragment` derived from that operation to read the response
 * data (masking data from child fragments).
 */
export type ConcreteRequest = {|
  +kind: 'Request',
  +fragment: ReaderFragment,
  +operation: NormalizationOperation,
  +params: RequestParameters,
|};

/**
 * An operation selector describes a specific instance of a GraphQL operation
 * with variables applied.
 *
 * - `root`: a selector intended for processing server results or retaining
 *   response data in the store.
 * - `fragment`: a selector intended for use in reading or subscribing to
 *   the results of the the operation.
 */
export type OperationDescriptor = {|
  +fragment: SingularReaderSelector,
  +request: $FlowFixMe,
  +root: NormalizationSelector,
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
export type RelayModernStore = {|
  +getSource: () => RecordSourceSelectorProxy,
  +lookup: SingularReaderSelector => Snapshot,
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
