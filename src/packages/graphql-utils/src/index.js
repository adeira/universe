// @flow

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
  type ConnectionArguments as ConnectionArgumentsType,
} from 'graphql-relay';

import connectionFromArray from './ArrayConnection';

export { connectionArgs, connectionDefinitions, connectionFromArray, connectionFromPromisedArray };

export type ConnectionArguments = ConnectionArgumentsType;

export { default as OptimisticDataloader } from './OptimisticDataloader';
