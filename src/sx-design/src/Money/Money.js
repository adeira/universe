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

// Modified `Intl$NumberFormatOptions` from Flow.
// See: https://github.com/facebook/flow/blob/8f29455d6a47debe27885e2298041435b30a78ce/lib/intl.js#L148-L160
type IntlNumberFormatOptions = {
  localeMatcher?: 'lookup' | 'best fit',
  style?: 'decimal' | 'currency' | 'percent',
  currency?: string,
  currencyDisplay?: 'symbol' | 'code' | 'name',
  useGrouping?: boolean,
  minimumIntegerDigits?: number,
  minimumFractionDigits?: number,
  maximumFractionDigits?: number,
  minimumSignificantDigits?: number,
  maximumSignificantDigits?: number,
  numberingSystem?: 'arab' | 'latn',
};

// This function does essentially the same like the React <Money /> component except it can be
// called from non-React environment.
export function MoneyFn(props: MoneyFnProps): string {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat
  const intlOptions: IntlNumberFormatOptions = {
    style: 'currency',
    currency: props.priceUnitAmountCurrency,
  };

  if (props.locale === 'ar-AR') {
    // We use "Latin digits" for Arabic as it is very common around the web. However, we allow
    // to explicitly specify custom numbering system via the locale string. For example, locale
    // `ar-AR-u-nu-arab` explicitly uses `arab` numbering system.
    // See: https://www.unicode.org/reports/tr35/#u_Extension
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/numberingSystem
    intlOptions.numberingSystem = 'latn';
  }

  return new Intl.NumberFormat(props.locale, intlOptions).format(props.priceUnitAmount);
}
