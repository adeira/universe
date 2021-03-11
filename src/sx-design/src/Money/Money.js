// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import type { SupportedCurrencies, SupportedLocales } from '../constants';
import useSxDesignContext from '../useSxDesignContext';

type MoneyProps = {
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: SupportedCurrencies,
};

export default function Money(props: MoneyProps): React.Node {
  const sxDesign = useSxDesignContext();
  return (
    <span className={styles('text')}>
      {MoneyFn({
        ...props,
        locale: sxDesign.locale,
      })}
    </span>
  );
}

const styles = sx.create({
  text: {
    color: 'rgba(var(--sx-money-text-color, var(--sx-text-color)))',
    transition: 'inherit',
  },
});

type MoneyFnProps = {
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: SupportedCurrencies,
  +locale: SupportedLocales,
};

// This function does essentially the same like the React <Money /> component except it can be
// called from non-React environment.
export function MoneyFn(props: MoneyFnProps): string {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  return new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.priceUnitAmountCurrency,
  }).format(props.priceUnitAmount);
}
