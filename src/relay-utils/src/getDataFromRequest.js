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
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, variables);

  const res = environment.lookup(operation.fragment);
  return res.data;
}
