// @flow

import * as React from 'react';
import { render } from '@testing-library/react';

import Money, { MoneyFn } from '../Money';
import SxDesignProvider from '../../SxDesignProvider';

// When adding new currencies, always add one line for `en-US` and one line for the new locale.
// This way we can test that it works well for both natives and foreigners.
test.each`
  locale               | amount | currency | expectedReact    | expectedFn
  ${'en-US'}           | ${10}  | ${'AED'} | ${'AED 10.00'}   | ${'AED 10.00'}
  ${'ar-AR'}           | ${10}  | ${'AED'} | ${'د.إ.‏ 10.00'} | ${'د.إ.‏ 10.00'}
  ${'ar-AR-u-nu-arab'} | ${10}  | ${'AED'} | ${'١٠٫٠٠ د.إ.‏'} | ${'١٠٫٠٠ د.إ.‏'}
  ${'en-US'}           | ${10}  | ${'CZK'} | ${'CZK 10.00'}   | ${'CZK 10.00'}
  ${'cs-CZ'}           | ${10}  | ${'CZK'} | ${'10,00 Kč'}    | ${'10,00 Kč'}
  ${'en-US'}           | ${20}  | ${'USD'} | ${'$20.00'}      | ${'$20.00'}
  ${'es-MX'}           | ${20}  | ${'USD'} | ${'USD 20.00'}   | ${'USD 20.00'}
  ${'en-US'}           | ${10}  | ${'MXN'} | ${'MX$10.00'}    | ${'MX$10.00'}
  ${'es-MX'}           | ${10}  | ${'MXN'} | ${'$10.00'}      | ${'$10.00'}
  ${'en-US'}           | ${10}  | ${'NOK'} | ${'NOK 10.00'}   | ${'NOK 10.00'}
  ${'no-NO'}           | ${10}  | ${'NOK'} | ${'kr 10,00'}    | ${'kr 10,00'}
  ${'en-US'}           | ${10}  | ${'RUB'} | ${'RUB 10.00'}   | ${'RUB 10.00'}
  ${'ru-RU'}           | ${10}  | ${'RUB'} | ${'10,00 ₽'}     | ${'10,00 ₽'}
  ${'en-US'}           | ${10}  | ${'UAH'} | ${'UAH 10.00'}   | ${'UAH 10.00'}
  ${'uk-UA'}           | ${10}  | ${'UAH'} | ${'10,00 ₴'}     | ${'10,00 ₴'}
`(
  'renders amount "$amount" with locale "$locale" and currency "$currency" correctly ("$expectedFn")',
  ({ locale, amount, currency, expectedReact, expectedFn }) => {
    const { getByText } = render(
      <SxDesignProvider locale={locale}>
        <Money priceUnitAmount={amount} priceUnitAmountCurrency={currency} />
      </SxDesignProvider>,
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
