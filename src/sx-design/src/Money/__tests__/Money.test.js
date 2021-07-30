/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';

import Money, { MoneyFn } from '../Money';
import { render } from '../../test-utils';

// When adding new currencies, always add one line for `en-US` and one line for the new locale.
// This way we can test that it works well for both natives and foreigners.
test.each`
  locale               | currency | expectedReact    | expectedFn
  ${'en-US'}           | ${'AED'} | ${'AED 10.00'}   | ${'AED 10.00'}
  ${'ar-AR'}           | ${'AED'} | ${'د.إ.‏ 10.00'} | ${'د.إ.‏ 10.00'}
  ${'ar-AR-u-nu-arab'} | ${'AED'} | ${'١٠٫٠٠ د.إ.‏'} | ${'١٠٫٠٠ د.إ.‏'}
  ${'en-US'}           | ${'CZK'} | ${'CZK 10.00'}   | ${'CZK 10.00'}
  ${'cs-CZ'}           | ${'CZK'} | ${'10,00 Kč'}    | ${'10,00 Kč'}
  ${'en-US'}           | ${'USD'} | ${'$10.00'}      | ${'$10.00'}
  ${'es-MX'}           | ${'USD'} | ${'USD 10.00'}   | ${'USD 10.00'}
  ${'en-US'}           | ${'MXN'} | ${'MX$10.00'}    | ${'MX$10.00'}
  ${'es-MX'}           | ${'MXN'} | ${'$10.00'}      | ${'$10.00'}
  ${'en-US'}           | ${'NOK'} | ${'NOK 10.00'}   | ${'NOK 10.00'}
  ${'no-NO'}           | ${'NOK'} | ${'kr 10,00'}    | ${'kr 10,00'}
  ${'en-US'}           | ${'RUB'} | ${'RUB 10.00'}   | ${'RUB 10.00'}
  ${'ru-RU'}           | ${'RUB'} | ${'10,00 ₽'}     | ${'10,00 ₽'}
  ${'en-US'}           | ${'UAH'} | ${'UAH 10.00'}   | ${'UAH 10.00'}
  ${'uk-UA'}           | ${'UAH'} | ${'10,00 ₴'}     | ${'10,00 ₴'}
`(
  'renders amount "$amount" with locale "$locale" and currency "$currency" correctly ("$expectedFn")',
  ({ locale, currency, expectedReact, expectedFn }) => {
    const amount = 10;

    const { getByText } = render(
      <Money priceUnitAmount={amount} priceUnitAmountCurrency={currency} />,
      { locale },
    );
    expect(getByText(expectedReact)).toBeDefined();

    // alternative non-React function
    expect(
      MoneyFn({
        locale,
        priceUnitAmount: amount,
        priceUnitAmountCurrency: currency,
      }),
    ).toBe(expectedFn);
  },
);
