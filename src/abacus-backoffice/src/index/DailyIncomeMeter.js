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

  const dailyGoal = 2500; // TODO: MXN only

  return (
    <LayoutBlock>
      <Meter
        min={0}
        max={dailyGoal}
        value={
          dailyReport.total.unitAmount / 100 // adjusted for centavo
        }
        low={dailyGoal * 0.8}
        optimum={dailyGoal}
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
