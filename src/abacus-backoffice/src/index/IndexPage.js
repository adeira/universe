// @flow

import * as React from 'react';
import { LayoutBlock, Money, Table, Text, DateTime } from '@adeira/sx-design';
import { graphql, useLazyLoadQuery } from '@adeira/relay';
import fbt from 'fbt';
import sx from '@adeira/sx';

import BarChart from '../d3/BarChart';
import refineSupportedCurrencies from '../refineSupportedCurrencies';

export default function IndexPage(): React.Node {
  // eslint-disable-next-line relay/generated-flow-types -- https://github.com/relayjs/eslint-plugin-relay/issues/131
  const data = useLazyLoadQuery(
    graphql`
      query IndexPageQuery {
        analytics {
          dailyReports {
            dateDay
            total {
              unitAmount
              unitAmountCurrency
            }
            productsSummary {
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
            col1: <DateTime value={dailyReport.dateDay} />,
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
              <BarChart
                sort="DESC"
                data={dailyReport.productsSummary.map((productSummary) => ({
                  label: `${productSummary.productName} (${productSummary.totalUnits}x)`,
                  value: productSummary.totalUnits,
                }))}
              />
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
