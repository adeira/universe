// @flow

import { useEffect, type Node } from 'react';

import {
  createFragmentContainer,
  graphql,
  type RelayProp,
  type RelayFragmentContainer,
  type Environment,
} from '../index';

type Props = {
  +relay: RelayProp,
};

function MyComponent(props: Props): Node {
  useEffect(() => {
    (props.relay.environment: Environment);
  });
  return null;
}

export default (createFragmentContainer(MyComponent, {
  data: graphql`
    query createFragmentContainer_data {
      __typename
    }
  `,
}): RelayFragmentContainer<typeof MyComponent>);
