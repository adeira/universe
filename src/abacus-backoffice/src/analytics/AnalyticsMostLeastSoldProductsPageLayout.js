// @flow

import { invariant } from '@adeira/js';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import { LayoutBlock, LayoutInline, Text } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { useState, type Node } from 'react';

import BarChart from '../d3/BarChart';
import LayoutPage from '../LayoutPage';
import type { TimeFrame } from './__generated__/AnalyticsMostLeastSoldProductsPageLayoutQuery.graphql';

export default function AnalyticsMostLeastSoldProductsPageLayout(): Node {
  const [direction, setDirection] = useState<'mostToLeast' | 'leastToMost'>('mostToLeast');
  const [timeFrame, setTimeframe] = useState<TimeFrame>('MONTH');

  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
    graphql`
      query AnalyticsMostLeastSoldProductsPageLayoutQuery(
        $timeFrame: TimeFrame!
        $showMostToLeast: Boolean!
      ) {
        analytics {
          mostSoldProducts(timeFrame: $timeFrame) @include(if: $showMostToLeast) {
            timeFrame
            dateYear
            stats {
              productName
              productUnits
            }
          }
          leastSoldProducts(timeFrame: $timeFrame) @skip(if: $showMostToLeast) {
            timeFrame
            dateYear
            stats {
              productName
              productUnits
            }
          }
        }
      }
    `,
    {
      timeFrame,
      showMostToLeast: direction === 'mostToLeast',
    },
  );

  const soldProducts =
    direction === 'mostToLeast'
      ? data.analytics.mostSoldProducts
      : data.analytics.leastSoldProducts;

  invariant(soldProducts != null, 'One of most/least sold products should be selected.');

  return (
    <LayoutPage
      isBeta={true}
      heading={<fbt desc="most sold products page heading">Most sold products</fbt>}
    >
      <select value={timeFrame} onChange={(event) => setTimeframe(event.target.value)}>
        <option value="YEAR">
          <fbt desc="select timeframe yearly option">Yearly</fbt>
        </option>
        <option value="QUARTER">
          <fbt desc="select timeframe quarterly option">Quarterly</fbt>
        </option>
        <option value="MONTH">
          <fbt desc="select timeframe monthly option">Monthly</fbt>
        </option>
        <option value="ISO_WEEK">
          <fbt desc="select timeframe weekly option">Weekly</fbt>
        </option>
      </select>

      <select value={direction} onChange={(event) => setDirection(event.target.value)}>
        <option value="mostToLeast">
          <fbt desc="select direction most to least option">Most to least</fbt>
        </option>
        <option value="leastToMost">
          <fbt desc="select direction least to most option">Least to most</fbt>
        </option>
      </select>

      <LayoutBlock spacing="large">
        {soldProducts.map((soldProduct) => {
          return (
            <div key={`${soldProduct.dateYear}:${soldProduct.timeFrame}`}>
              <LayoutInline alignItems="baseline">
                <Text size={32}>
                  {soldProduct.dateYear} / {soldProduct.timeFrame}
                </Text>
              </LayoutInline>
              <BarChart
                key={direction}
                sort={direction === 'mostToLeast' ? 'DESC' : 'ASC'}
                data={soldProduct.stats.map((info) => ({
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
