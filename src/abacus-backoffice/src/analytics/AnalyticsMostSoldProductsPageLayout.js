// @flow

import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { LayoutBlock, LayoutInline, Text } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';

import BarChart from '../d3/BarChart';
import LayoutPage from '../LayoutPage';
import QuarterNumberToString from './QuarterNumberToString';

export default function AnalyticsMostSoldProductsPageLayout(): Node {
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
    graphql`
      query AnalyticsMostSoldProductsPageLayoutQuery {
        analytics {
          mostSoldProductsQuarterly {
            dateQuarter
            dateYear
            stats {
              productName
              productUnits
            }
          }
        }
      }
    `,
  );

  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="analytics page heading">Analytics</fbt>}
      description={<fbt desc="analytics page description">Most sold products per quarter.</fbt>}
    >
      <LayoutBlock spacing="large">
        {data.analytics.mostSoldProductsQuarterly.map((quarter) => {
          return (
            <div key={`${quarter.dateYear}:${quarter.dateQuarter}`}>
              <LayoutInline alignItems="baseline">
                <Text size={32}>
                  {quarter.dateYear} / Q{quarter.dateQuarter}
                </Text>
                <Text weight={200}>
                  (<QuarterNumberToString quarterNumber={quarter.dateQuarter} />)
                </Text>
              </LayoutInline>
              <BarChart
                sort="DESC"
                data={quarter.stats.map((info) => ({
                  label: `${info.productName} (${info.productUnits}x)`,
                  value: info.productUnits,
                }))}
              />
            </div>
          );
        })}
      </LayoutBlock>
    </LayoutPage>
  );
}
