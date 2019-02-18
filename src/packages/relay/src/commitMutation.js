// @flow

import { Environment } from 'relay-runtime';
import { commitMutation as _commitMutation } from 'react-relay';

import type { Variables, GeneratedNodeMap } from './types.flow';

type RangeOperation = 'append' | 'ignore' | 'prepend' | 'refetch' | 'remove';

type RangeBehaviorsFunction = (connectionArgs: {
  [name: string]: $FlowFixMe,
}) => RangeOperation;

type RangeBehaviorsObject = { [key: string]: RangeOperation };

type RangeBehaviors = RangeBehaviorsFunction | RangeBehaviorsObject;

type RangeAddConfig = {|
  type: 'RANGE_ADD',
  parentName?: string,
  parentID?: string,
  connectionInfo?: Array<{|
    key: string,
    filters?: Variables,
    rangeBehavior: string,
  |}>,
  connectionName?: string,
  edgeName: string,
  rangeBehaviors?: RangeBehaviors,
|};

type DeclarativeMutationConfig =
  | RangeAddConfig
  | RangeDeleteConfig
  | NodeDeleteConfig;

type RangeDeleteConfig = {|
  type: 'RANGE_DELETE',
  parentName?: string,
  parentID?: string,
  connectionKeys?: Array<{|
    key: string,
    filters?: Variables,
  |}>,
  connectionName?: string,
  deletedIDFieldName: string | Array<string>,
  pathToConnection: Array<string>,
|};

declare type NodeDeleteConfig = {|
  type: 'NODE_DELETE',
  parentName?: string,
  parentID?: string,
  connectionName?: string,
  deletedIDFieldName: string,
|};

type RecordSourceSelectorProxy = $FlowFixMe;
type SelectorData = $FlowFixMe;

type Config = {
  mutation: GeneratedNodeMap,
  variables: Variables,
  onCompleted?: ?(response: ?Object, errors: ?$ReadOnlyArray<Error>) => void,
  onError?: ?(error: Error) => void,
  optimisticResponse?: Object,
  optimisticUpdater?: ?(store: RecordSourceSelectorProxy) => void,
  updater?: ?(store: RecordSourceSelectorProxy, data: SelectorData) => void,
  configs?: $ReadOnlyArray<DeclarativeMutationConfig>,
};

/**
 * The first parameter `environment` should be from `props.relay.environment`
 * to ensure the mutation is performed in the correct environment.
 */
export default function commitMutation(
  environment: Environment,
  config: Config,
) {
  return _commitMutation(environment, config);
}
