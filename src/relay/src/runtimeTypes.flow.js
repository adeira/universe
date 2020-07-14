// @flow

import type { Variables, RecordProxy } from '@adeira/relay-runtime';
import type { RecordMap as _RecordMap } from 'relay-runtime/store/RelayStoreTypes.js.flow';

export type { Environment } from 'react-relay';
export type { Scheduler, OperationLoader } from 'relay-runtime/store/RelayStoreTypes.js.flow';
export type { GetDataID } from 'relay-runtime/store/RelayResponseNormalizer.js.flow';
export type { LogFunction } from 'relay-runtime';

type DataID = string;

/**
 * A collection of records keyed by id.
 */
export type RecordMap = _RecordMap;

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

export type RecordSourceSelectorProxy = {|
  +create: (dataID: string, typeName: string) => RecordProxy,
  +delete: (dataID: string) => void,
  +get: (dataID: string) => ?RecordProxy,
  +getRoot: () => RecordProxy,
  +getRootField: (fieldName: string) => ?RecordProxy,
  +getPluralRootField: (fieldName: string) => ?$ReadOnlyArray<?RecordProxy>,
  +toJSON: () => RecordMap,
|};
