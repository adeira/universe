// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import type { SupportedCurrencies, SupportedLocales } from '../constants';
import useSxDesignContext from '../useSxDesignContext';

type MoneyProps = {
  +priceUnitAmount: number,
  +priceUnitAmountCurrency: SupportedCurrencies,
};

/**
 * Renders prices in a locale-specific format.
 *
 * ## CSS variables
 *
 * `--sx-money-text-color` (overwrites color of the text)
 */
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
    color: 'rgba(var(--sx-money-text-color, var(--sx-foreground)))',
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
  const intlOptions: Intl$NumberFormatOptions = {
    style: 'currency',
    currency: (props.priceUnitAmountCurrency: string),
  };

  if (props.locale === 'ar-AR') {
    // We use "Latin numerals" (0123456789) for Arabic by default as it is very common around the
    // web. However, we allow explicitly specifying a custom numbering system via the locale string.
    // For example, locale `ar-AR-u-nu-arab` explicitly uses `arab` numbering system.
    //
    // See: https://www.unicode.org/reports/tr35/#u_Extension
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystem
    // $FlowFixMe[prop-missing]
    intlOptions.numberingSystem = 'latn';
  }

  return new Intl.NumberFormat(props.locale, intlOptions).format(props.priceUnitAmount);
}
