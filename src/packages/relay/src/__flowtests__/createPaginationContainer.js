// @flow

import { useEffect } from 'react';

import { createPaginationContainer, graphql, type PaginationRelayProp } from '../index';

type Props = {|
  +relay: PaginationRelayProp,
|};

module.exports = {
  validUsage() {
    return createPaginationContainer(
      (props: Props) => {
        useEffect(() => {
          props.relay.loadMore(5);
        });
        return null;
      },
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
    );
  },
};
