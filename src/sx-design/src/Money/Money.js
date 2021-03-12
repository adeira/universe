// @flow

import * as React from 'react';

import type { SupportedCurrencies, SupportedLocales } from '../constants';
import useSxDesignContext from '../useSxDesignContext';

export default function Money(props: {|
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: SupportedCurrencies,
|}): React.Node {
  const sxDesign = useSxDesignContext();
  return MoneyFn({
    ...props,
    locale: sxDesign.locale,
  });
}

// This function does essentially the same like the React <Money /> component except it can be
// called from non-React environment.
export function MoneyFn(props: {|
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: SupportedCurrencies,
  +locale: SupportedLocales,
|}): string {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  return new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.priceUnitAmountCurrency,
  }).format(props.priceUnitAmount);
}
