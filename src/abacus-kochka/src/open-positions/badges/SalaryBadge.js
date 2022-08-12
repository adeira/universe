// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';
import { Badge, Money, type SupportedCurrencies } from '@adeira/sx-design';

type Props = {
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: SupportedCurrencies,
  +isPriceNegotiable?: boolean,
};

export default function SalaryBadge(props: Props): Node {
  return (
    <Badge tint="default">
      <fbt desc="salary badge text">
        <fbt:param name="money">
          <Money
            priceUnitAmount={props.priceUnitAmount}
            priceUnitAmountCurrency={props.priceUnitAmountCurrency}
          />
        </fbt:param>{' '}
        / month{' '}
        <fbt:param name="negotiable">
          {props.isPriceNegotiable ? (
            <strong>
              <fbt desc="negotiable">(negotiable)</fbt>
            </strong>
          ) : (
            ''
          )}
        </fbt:param>
      </fbt>
    </Badge>
  );
}
