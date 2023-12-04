/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';

import Money, { MoneyFn } from '../Money';
import { render } from '../../test-utils';
import { SupportedCurrencies } from '../../constants';

// When adding new currencies, always add one line for `en-US` and one line for the new locale.
// This way we can test that it works well for both natives and foreigners.
//
// TODO: remove old ICU test cases when not needed
test.each`
  locale     | currency | expectedReact  | expectedReactICU741 | expectedFn     | expectedFnICU741
  ${'en-US'} | ${'CZK'} | ${'CZK 10.00'} | ${'CZK 10.00'}      | ${'CZK 10.00'} | ${'CZK 10.00'}
  ${'cs-CZ'} | ${'CZK'} | ${'10,00 Kč'}  | ${'10,00 Kč'}       | ${'10,00 Kč'}  | ${'10,00 Kč'}
  ${'en-US'} | ${'USD'} | ${'$10.00'}    | ${'$10.00'}         | ${'$10.00'}    | ${'$10.00'}
  ${'es-MX'} | ${'USD'} | ${'USD 10.00'} | ${'USD 10.00'}      | ${'USD 10.00'} | ${'USD 10.00'}
  ${'en-US'} | ${'MXN'} | ${'MX$10.00'}  | ${'MX$10.00'}       | ${'MX$10.00'}  | ${'MX$10.00'}
  ${'es-MX'} | ${'MXN'} | ${'$10.00'}    | ${'$10.00'}         | ${'$10.00'}    | ${'$10.00'}
  ${'en-US'} | ${'NOK'} | ${'NOK 10.00'} | ${'NOK 10.00'}      | ${'NOK 10.00'} | ${'NOK 10.00'}
  ${'no-NO'} | ${'NOK'} | ${'kr 10,00'}  | ${'10,00 kr'}       | ${'kr 10,00'}  | ${'10,00 kr'}
  ${'en-US'} | ${'RUB'} | ${'RUB 10.00'} | ${'RUB 10.00'}      | ${'RUB 10.00'} | ${'RUB 10.00'}
  ${'ru-RU'} | ${'RUB'} | ${'10,00 ₽'}   | ${'10,00 ₽'}        | ${'10,00 ₽'}   | ${'10,00 ₽'}
  ${'en-US'} | ${'UAH'} | ${'UAH 10.00'} | ${'UAH 10.00'}      | ${'UAH 10.00'} | ${'UAH 10.00'}
  ${'uk-UA'} | ${'UAH'} | ${'10,00 ₴'}   | ${'10,00 ₴'}        | ${'10,00 ₴'}   | ${'10,00 ₴'}
`(
  'renders price with locale "$locale" and currency "$currency" correctly ("$expectedFn")',
  ({ locale, currency, expectedReact, expectedReactICU741, expectedFn, expectedFnICU741 }) => {
    const amount = 10;

    const { getByText } = render(
      <Money priceUnitAmount={amount} priceUnitAmountCurrency={currency} />,
      { locale },
    );

    if (Number(process.versions.icu) >= 74.1) {
      // Change in ICU 74.1 (https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V21.md#21.3.0)
      expect(getByText(expectedReactICU741)).toBeInTheDocument();
    } else {
      expect(getByText(expectedReact)).toBeInTheDocument();
    }

    // alternative non-React function
    if (Number(process.versions.icu) >= 74.1) {
      expect(
        MoneyFn({
          locale,
          priceUnitAmount: amount,
          priceUnitAmountCurrency: currency,
        }),
      ).toBe(expectedFnICU741);
    } else {
      expect(
        MoneyFn({
          locale,
          priceUnitAmount: amount,
          priceUnitAmountCurrency: currency,
        }),
      ).toBe(expectedFn);
    }
  },
);

// Special test case for arabic (different before and after Node.js 19.1.0 - change in ICU 72.1).
// See: https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V19.md#19.1.0
//
// TODO: remove old ICU test cases when not needed
test.each`
  locale               | expectedFn       | expectedFnICU721
  ${'en-US'}           | ${'AED 10.00'}   | ${'AED 10.00'}
  ${'ar-AR'}           | ${'د.إ.‏ 10.00'} | ${'‏10.00 د.إ.‏'}
  ${'ar-AR-u-nu-arab'} | ${'١٠٫٠٠ د.إ.‏'} | ${'‏١٠٫٠٠ د.إ.‏'}
`(
  'renders price with locale "$locale" and currency "AED" correctly ("$expectedFn")',
  ({ locale, expectedFn, expectedFnICU721 }) => {
    const amount = 10;
    const currency = SupportedCurrencies.AED;

    if (Number(process.versions.icu) >= 72.1) {
      // Change in ICU 72.1 (https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V19.md#19.1.0)
      expect(
        MoneyFn({
          locale,
          priceUnitAmount: amount,
          priceUnitAmountCurrency: currency,
        }),
      ).toBe(expectedFnICU721);
    } else {
      expect(
        MoneyFn({
          locale,
          priceUnitAmount: amount,
          priceUnitAmountCurrency: currency,
        }),
      ).toBe(expectedFn);
    }
  },
);
