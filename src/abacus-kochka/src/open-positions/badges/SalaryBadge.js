// @flow

import fbt from 'fbt';
import React, { type Node } from 'react';
import { Badge, Money, SupportedCurrencies } from '@adeira/sx-design';

export default function SalaryBadge(): Node {
  return (
    <Badge tint="default">
      <fbt desc="salary badge text">
        <fbt:param name="money">
          <Money priceUnitAmount={6000} priceUnitAmountCurrency={SupportedCurrencies.MXN} />
        </fbt:param>{' '}
        / month
      </fbt>
    </Badge>
  );
}
