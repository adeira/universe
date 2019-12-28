// @flow

import { getRequest, createOperationDescriptor } from 'relay-runtime';
import type { Environment, GraphQLTaggedNode, Variables } from '@adeira/relay';

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
  const data = res.data;
  return data;
}
