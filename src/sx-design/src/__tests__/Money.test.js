// @flow strict

import * as React from 'react';
import { render } from '@testing-library/react';

import Money from '../Money';

test.each`
  locale     | amount | currency | expected
  ${'en-US'} | ${10}  | ${'MXN'} | ${'MX$10.00'}
  ${'es-MX'} | ${10}  | ${'MXN'} | ${'$10.00'}
  ${'en-US'} | ${20}  | ${'USD'} | ${'$20.00'}
  ${'es-MX'} | ${20}  | ${'USD'} | ${'USD&nbsp;20.00'}
`(
  'renders amount "$amount" with locale "$locale" and currency "$currency" correctly ("$expected")',
  ({ locale, amount, currency, expected }) => {
    const { container } = render(
      <Money locale={locale} priceUnitAmount={amount} priceUnitAmountCurrency={currency} />,
    );
    expect(container.innerHTML).toBe(expected);
  },
);
