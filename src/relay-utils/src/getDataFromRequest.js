// @flow

import { getRequest, createOperationDescriptor } from 'relay-runtime';
import type { Environment, GraphQLTaggedNode } from '@adeira/relay';
import type { Variables } from '@adeira/relay-runtime';

type Operation = {|
  +query: GraphQLTaggedNode,
  +variables: Variables,
|};

export default function getDataFromRequest(
  { query, variables }: Operation,
  environment: Environment,
) {
  // $FlowFixMe errors after upgrading to relay 9.1.0
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, variables);

  const res = environment.lookup(operation.fragment);
  return res.data;
}
