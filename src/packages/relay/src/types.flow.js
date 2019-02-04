// @flow

import type { RequestNode as _RequestNode } from 'relay-runtime';
import type {
  CacheConfig as _CacheConfig,
  UploadableMap as _UploadableMap,
  Variables as _Variables,
} from 'react-relay';

export type RequestNode = _RequestNode;
export type CacheConfig = _CacheConfig;
export type Uploadables = _UploadableMap;
export type Variables = _Variables;

type ConcreteOperation = any;
type GraphQLResponse = any;

/**
 * The data returned from Relay's execute function, which includes both the
 * raw GraphQL network response as well as any related client metadata.
 */
type ExecutePayload = {|
  // The operation executed
  operation: ConcreteOperation,
  // The variables which were used during this execution.
  variables: Variables,
  // The response from GraphQL execution
  response: GraphQLResponse,
  // Default is false
  isOptimistic?: boolean,
|};

/**
 * A Sink is an object of methods provided by Observable during construction.
 * The methods are to be called to trigger each event. It also contains a closed
 * field to see if the resulting subscription has closed.
 */
export type Sink = {|
  +next: ExecutePayload => void,
  +error: (Error, isUncaughtThrownError?: boolean) => void,
  +complete: () => void,
  +closed: boolean,
|};
