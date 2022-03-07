// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';
import React, { type Node } from 'react';

import BarChart from '../d3/BarChart';
import LayoutPage from '../LayoutPage';

export default function AnalyticsMostSoldProductsPageLayout(): Node {
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
    graphql`
      query AnalyticsMostSoldProductsPageLayoutQuery {
        analytics {
          mostSoldProducts {
            productName
            productUnits
          }
        }
      }
    `,
  );

  return (
    <LayoutPage
      isBeta={true}
      heading={
        <fbt desc="analytics most sold products page heading">Analytics: most sold products</fbt>
      }
    >
      <BarChart
        sort="DESC"
        data={data.analytics.mostSoldProducts.map((info) => ({
          label: `${info.productName} (${info.productUnits}x)`,
          value: info.productUnits,
        }))}
      />
    </LayoutPage>
  );
}
