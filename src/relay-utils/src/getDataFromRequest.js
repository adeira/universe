// @flow

import { getRequest, createOperationDescriptor, type Snapshot } from 'relay-runtime';
import type { Environment, GraphQLTaggedNode } from '@adeira/relay';
import type { Variables } from '@adeira/relay-runtime';

type Operation = {|
  +query: GraphQLTaggedNode,
  +variables: Variables,
|};

export default function getDataFromRequest(
  { query, variables }: Operation,
  environment: Environment,
): $PropertyType<Snapshot, 'data'> {
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, variables);

  const res = environment.lookup(operation.fragment);
  return res.data;
}
