// @flow

import {
  createRefetchContainer,
  graphql,
  type RefetchRelayProp,
} from '../index';

type Props = {|
  +relay: RefetchRelayProp,
|};

module.exports = {
  validUsage() {
    return createRefetchContainer(
      (props: Props) => {
        return JSON.stringify(props.relay.refetch({}));
      },
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
    );
  },
};
