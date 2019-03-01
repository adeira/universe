// @flow

import {
  createPaginationContainer,
  graphql,
  type PaginationRelayProp,
} from '../index';

type Props = {|
  +relay: PaginationRelayProp,
|};

module.exports = {
  validUsage() {
    return createPaginationContainer(
      (props: Props) => {
        return JSON.stringify(props.relay.loadMore(5));
      },
      {
        data: graphql`
          query createPaginationContainer_data {
            __typename
          }
        `,
      },
      {
        getVariables: () => {},
        query: graphql`
          query createPaginationContainer {
            ...createPaginationContainer_data
          }
        `,
      },
    );
  },
};
