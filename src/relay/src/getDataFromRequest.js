// @flow

import {
  createOperationDescriptor,
  getRequest,
  type Snapshot,
  type GraphQLTaggedNode,
  type Variables,
} from 'relay-runtime';
import type { Environment } from 'react-relay';

type Operation = {
  +query: GraphQLTaggedNode,
  +variables: Variables,
};

export default function getDataFromRequest(
  { query, variables }: Operation,
  environment: Environment,
): Snapshot['data'] {
  const request = getRequest(query);
  const operation = createOperationDescriptor(request, variables);

  const res = environment.lookup(operation.fragment);
  return res.data;
}
