// @flow strict

import * as React from 'react';

import type { SupportedCurrencies, SupportedLocales } from './constants';

type Props = {|
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: SupportedCurrencies,
  +locale: SupportedLocales,
|};

export default function Money(props: Props): React.Node {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  return new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.priceUnitAmountCurrency,
  }).format(props.priceUnitAmount);
}
