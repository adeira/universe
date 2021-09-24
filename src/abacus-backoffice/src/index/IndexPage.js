// @flow

import * as React from 'react';
import { LayoutBlock, Text } from '@adeira/sx-design';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';

import BarChart from '../d3/BarChart';
import type { IndexPageQuery } from './__generated__/IndexPageQuery.graphql';

export default function IndexPage(): React.Node {
  const data = useLazyLoadQuery<IndexPageQuery>(
    graphql`
      query IndexPageQuery {
        analytics {
          mostSoldProducts {
            productId
            productName
            productUnits
          }
          leastSoldProducts {
            productId
            productName
            productUnits
          }
        }
      }
    `,
  );

  return (
    <LayoutBlock spacing="large">
      <LayoutBlock>
        <Text as="h2">
          <fbt desc="most sold products heading">Most sold products</fbt>
        </Text>
        <BarChart
          sort="DESC"
          data={data.analytics.mostSoldProducts.map((info) => ({
            label: `${info.productName} (${info.productId})`,
            value: info.productUnits,
          }))}
        />
      </LayoutBlock>

      <LayoutBlock>
        <Text as="h2">
          <fbt desc="least sold products heading">Least sold products</fbt>
        </Text>
        <BarChart
          sort="ASC"
          data={data.analytics.leastSoldProducts.map((info) => ({
            label: `${info.productName} (${info.productId})`,
            value: info.productUnits,
          }))}
        />
      </LayoutBlock>
    </LayoutBlock>
  );
}
