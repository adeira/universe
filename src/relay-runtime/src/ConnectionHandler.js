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
  return ConnectionHandler.buildConnectionEdge(record, connection, edge);
}

function createEdge(
  store: RecordSourceProxy,
  record: RecordProxy,
  node: RecordProxy,
  edgeType: string,
): RecordProxy {
  return ConnectionHandler.createEdge(store, record, node, edgeType);
}

function deleteNode(record: RecordProxy, nodeID: DataID): void {
  ConnectionHandler.deleteNode(record, nodeID);
}

function getConnection(
  record: ReadOnlyRecordProxy,
  key: string,
  filters?: ?Variables,
): ?RecordProxy {
  return ConnectionHandler.getConnection(record, key, filters);
}

function insertEdgeAfter(record: RecordProxy, newEdge: RecordProxy, cursor?: ?string): void {
  ConnectionHandler.insertEdgeAfter(record, newEdge, cursor);
}

function insertEdgeBefore(record: RecordProxy, newEdge: RecordProxy, cursor?: ?string): void {
  ConnectionHandler.insertEdgeBefore(record, newEdge, cursor);
}

function update(store: RecordSourceProxy, payload: HandleFieldPayload): void {
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
