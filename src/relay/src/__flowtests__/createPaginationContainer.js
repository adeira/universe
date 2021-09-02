/* eslint-disable relay/must-colocate-fragment-spreads */
// @flow

import { useEffect, type Node } from 'react';

import {
  createPaginationContainer,
  graphql,
  type RelayPaginationProp,
  type RelayPaginationContainer,
  type Environment,
} from '../index';

type Props = {
  +relay: RelayPaginationProp,
};

function MyComponent(props: Props): Node {
  useEffect(() => {
    (props.relay.environment: Environment);
    props.relay.loadMore(5);
  });
  return null;
}

export default (createPaginationContainer(
  MyComponent,
  {
    data: graphql`
      query createPaginationContainer_data {
        __typename
      }
    `,
  },
  {
    getVariables: () => ({}),
    query: graphql`
      query createPaginationContainer {
        ...createPaginationContainer_data
      }
    `,
  },
): RelayPaginationContainer<typeof MyComponent>);
