// @flow

import type { RecordProxy } from 'relay-runtime';
import type { RecordMap as _RecordMap } from 'relay-runtime/store/RelayStoreTypes.js.flow';

export type { Scheduler, OperationLoader } from 'relay-runtime/store/RelayStoreTypes.js.flow';
export type { GetDataID } from 'relay-runtime/store/RelayResponseNormalizer.js.flow';
export type { LogFunction } from 'relay-runtime';

/**
 * A collection of records keyed by id.
 */
export type RecordMap = _RecordMap;

export type RecordSourceSelectorProxy = {|
  +create: (dataID: string, typeName: string) => RecordProxy,
  +delete: (dataID: string) => void,
  +get: (dataID: string) => ?RecordProxy,
  +getRoot: () => RecordProxy,
  +getRootField: (fieldName: string) => ?RecordProxy,
  +getPluralRootField: (fieldName: string) => ?$ReadOnlyArray<?RecordProxy>,
  +toJSON: () => RecordMap,
|};
