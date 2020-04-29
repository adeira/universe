// @flow

import { ConnectionHandler } from 'relay-runtime';

import type {
  RecordSourceProxy,
  RecordProxy,
  Variables,
  DataID,
  ReadOnlyRecordProxy,
  HandleFieldPayload,
} from './RelayRuntimeTypes';

function buildConnectionEdge(
  record: RecordSourceProxy,
  connection: RecordProxy,
  edge: RecordProxy,
): RecordProxy {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  return ConnectionHandler.buildConnectionEdge(record, connection, edge);
}

function createEdge(
  store: RecordSourceProxy,
  record: RecordProxy,
  node: RecordProxy,
  edgeType: string,
): RecordProxy {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  return ConnectionHandler.createEdge(store, record, node, edgeType);
}

function deleteNode(record: RecordProxy, nodeID: DataID): void {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  ConnectionHandler.deleteNode(record, nodeID);
}

function getConnection(
  record: ReadOnlyRecordProxy,
  key: string,
  filters?: ?Variables,
): ?RecordProxy {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  return ConnectionHandler.getConnection(record, key, filters);
}

function insertEdgeAfter(record: RecordProxy, newEdge: RecordProxy, cursor?: ?string): void {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  ConnectionHandler.insertEdgeAfter(record, newEdge, cursor);
}

function insertEdgeBefore(record: RecordProxy, newEdge: RecordProxy, cursor?: ?string): void {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  ConnectionHandler.insertEdgeBefore(record, newEdge, cursor);
}

function update(store: RecordSourceProxy, payload: HandleFieldPayload): void {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  ConnectionHandler.update(store, payload);
}

const connectionHandler = {
  buildConnectionEdge,
  createEdge,
  deleteNode,
  getConnection,
  insertEdgeAfter,
  insertEdgeBefore,
  update,
};

export default connectionHandler;
