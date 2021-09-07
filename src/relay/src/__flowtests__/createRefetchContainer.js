/* eslint-disable relay/must-colocate-fragment-spreads */
// @flow

import { type Node } from 'react';

import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp,
  type RelayRefetchContainer,
  type Environment,
} from '../index';

type Props = {
  +relay: RelayRefetchProp,
};

function MyComponent(props: Props): Node {
  (props.relay.environment: Environment);
  return JSON.stringify(props.relay.refetch({}));
}

export default (createRefetchContainer(
  MyComponent,
  {
    data: graphql`
      query createRefetchContainer_data {
        __typename
      }
    `,
  },
  graphql`
    query createRefetchContainer {
      ...createRefetchContainer_data
    }
  `,
): RelayRefetchContainer<typeof MyComponent>);
