// @flow

import type { RecordObjectMap as _RecordObjectMap } from 'relay-runtime/store/RelayStoreTypes.js.flow';

export type { Scheduler, OperationLoader } from 'relay-runtime/store/RelayStoreTypes.js.flow';
export type { GetDataID } from 'relay-runtime/store/RelayResponseNormalizer.js.flow';
export type { LogFunction } from 'relay-runtime';

/**
 * A collection of records keyed by id.
 */
export type RecordMap = _RecordObjectMap;
