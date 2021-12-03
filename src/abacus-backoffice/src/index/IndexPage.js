// @flow

import * as React from 'react';
import { LayoutBlock, Money, Table, Text } from '@adeira/sx-design';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';
import sx from '@adeira/sx';

import BarChart from '../d3/BarChart';
import refineSupportedCurrencies from '../refineSupportedCurrencies';
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
          dailyReports {
            dateDay
            total {
              unitAmount
              unitAmountCurrency
            }
            productsSummary {
              productId
              productName
              totalUnits
            }
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
          label: `${info.productName} (${info.productUnits}x)`,
          value: info.productUnits,
        }))}
      />

      <span className={styles('heading')}>
        <Text as="h2">
          <fbt desc="daily reports heading">Daily reports (last 30 days)</fbt>
        </Text>
      </span>

      <Table
        columns={[
          { Header: <fbt desc="date of the day (table header)">Date</fbt>, accessor: 'col1' },
          {
            Header: <fbt desc="total icome per day (table header)">Total income per day</fbt>,
            accessor: 'col2',
          },
          {
            Header: (
              <fbt desc="details about sold products per day (table header)">Sold products</fbt>
            ),
            accessor: 'col3',
          },
        ]}
        data={data.analytics.dailyReports.map((dailyReport) => {
          return {
            col1: dailyReport.dateDay,
            col2: (
              <Money
                priceUnitAmount={
                  dailyReport.total.unitAmount / 100 // adjusted for centavo
                }
                priceUnitAmountCurrency={refineSupportedCurrencies(
                  dailyReport.total.unitAmountCurrency,
                )}
              />
            ),
            col3: (
              <ul>
                {dailyReport.productsSummary.map((productSummary) => {
                  return (
                    <li key={productSummary.productId}>
                      {productSummary.productName} ({productSummary.totalUnits}x)
                    </li>
                  );
                })}
              </ul>
            ),
          };
        })}
      />
    </LayoutBlock>
  );
}

const styles = sx.create({
  heading: {
    color: 'rgba(var(--sx-foreground))',
  },
});
