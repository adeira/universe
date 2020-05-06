// @flow strict-local

import type { Variables as _Variables } from 'relay-runtime';
// https://github.com/facebook/relay/blob/master/packages/relay-runtime/util/RelayRuntimeTypes.js

export type Variables = _Variables;

export type DataID = string;

export type RecordProxy = $ReadOnly<{|
  copyFieldsFrom: (sourceRecord: RecordProxy) => void,
  getDataID: () => string,
  getLinkedRecord: (name: string, args?: ?Variables) => ?RecordProxy,
  getLinkedRecords: (name: string, args?: ?Variables) => ?$ReadOnlyArray<?RecordProxy>,
  getOrCreateLinkedRecord: (name: string, typeName: string, args?: ?Variables) => RecordProxy,
  getType: () => string,
  getValue: (name: string, args?: ?Variables) => mixed,
  setLinkedRecord: (record: RecordProxy, name: string, args?: ?Variables) => RecordProxy,
  setLinkedRecords: (
    records: $ReadOnlyArray<?RecordProxy>,
    name: string,
    args?: ?Variables,
  ) => RecordProxy,
  setValue: (value: mixed, name: string, args?: ?Variables) => RecordProxy,
|}>;

export interface RecordSourceProxy {
  create(dataID: DataID, typeName: string): RecordProxy;
  delete(dataID: DataID): void;
  get(dataID: DataID): ?RecordProxy;
  getRoot(): RecordProxy;
  invalidateStore(): void;
}

export interface ReadOnlyRecordProxy {
  getDataID(): DataID;
  getLinkedRecord(name: string, args?: ?Variables): ?RecordProxy;
  getLinkedRecords(name: string, args?: ?Variables): ?Array<?RecordProxy>;
  getType(): string;
  getValue(name: string, args?: ?Variables): mixed;
}

export type HandleFieldPayload = {|
  // The arguments that were fetched.
  +args: Variables,
  // The __id of the record containing the source/handle field.
  +dataID: DataID,
  // The (storage) key at which the original server data was written.
  +fieldKey: string,
  // The name of the handle.
  +handle: string,
  // The (storage) key at which the handle's data should be written by the
  // handler.
  +handleKey: string,
|};
