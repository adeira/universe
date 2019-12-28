// @flow

import * as React from 'react';
import { useFragment, graphql } from '@adeira/relay/hooks';

import type { HotelsList_hotels$key } from './__generated__/HotelsList_hotels.graphql';
import HotelListItem from './HotelListItem';

type Props = {|
  +hotels: ?HotelsList_hotels$key,
|};

export default function HotelsList(props: Props): React.Node {
  const hotels = useFragment(
    graphql`
      fragment HotelsList_hotels on AllHotelAvailabilityHotelConnection {
        edges {
          node {
            id
            ...HotelListItem_hotel
          }
        }
      }
    `,
    props.hotels,
  );

  const edges = hotels?.edges ?? [];
  return edges.map(edge => <HotelListItem key={edge?.node?.id} hotel={edge?.node} />);
}
