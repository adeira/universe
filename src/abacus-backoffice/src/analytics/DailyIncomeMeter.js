// @flow

import { graphql, useFragment } from '@adeira/relay';
import { LayoutBlock, Meter, Money } from '@adeira/sx-design';
import type { Node } from 'react';

import refineSupportedCurrencies from '../refineSupportedCurrencies';
import type { DailyIncomeMeterFragment$key } from './__generated__/DailyIncomeMeterFragment.graphql';

type Props = {
  +data: DailyIncomeMeterFragment$key,
};

export default function DailyIncomeMeter(props: Props): Node {
  const dailyReport = useFragment(
    graphql`
      fragment DailyIncomeMeterFragment on AnalyticsDailyReportInfo {
        total {
          unitAmount
          unitAmountCurrency
        }
      }
    `,
    props.data,
  );

  return (
    <LayoutBlock>
      <Meter
        // TODO: currently only MXN is supported
        min={0}
        max={3000}
        value={
          dailyReport.total.unitAmount / 100 // adjusted for centavo
        }
        low={2200}
        high={2600}
        optimum={3000}
      />
      <Money
        priceUnitAmount={
          dailyReport.total.unitAmount / 100 // adjusted for centavo
        }
        priceUnitAmountCurrency={refineSupportedCurrencies(dailyReport.total.unitAmountCurrency)}
      />
    </LayoutBlock>
  );
}
