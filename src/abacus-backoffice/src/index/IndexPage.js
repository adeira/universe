// @flow

import * as React from 'react';
import { LayoutBlock, Text } from '@adeira/sx-design';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';
import sx from '@adeira/sx';

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
        }
      }
    `,
  );

  return (
    <LayoutBlock>
      <span className={styles('heading')}>
        <Text as="h2">
          <fbt desc="most sold products heading">Most sold products</fbt>
        </Text>
      </span>

      <BarChart
        sort="DESC"
        data={data.analytics.mostSoldProducts.map((info) => ({
          label: `${info.productName} (${info.productId})`,
          value: info.productUnits,
        }))}
      />
    </LayoutBlock>
  );
}

const styles = sx.create({
  heading: {
    color: 'rgba(var(--sx-foreground))',
  },
});
