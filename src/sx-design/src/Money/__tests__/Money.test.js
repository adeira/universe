// @flow

import * as React from 'react';
import { render } from '@testing-library/react';

import Money, { MoneyFn } from '../Money';
import SxDesignProvider from '../../SxDesignProvider';

test.each`
  locale     | amount | currency | expectedReact       | expectedFn
  ${'en-US'} | ${10}  | ${'MXN'} | ${'MX$10.00'}       | ${'MX$10.00'}
  ${'es-MX'} | ${10}  | ${'MXN'} | ${'$10.00'}         | ${'$10.00'}
  ${'en-US'} | ${20}  | ${'USD'} | ${'$20.00'}         | ${'$20.00'}
  ${'es-MX'} | ${20}  | ${'USD'} | ${'USD&nbsp;20.00'} | ${'USD 20.00'}
`(
  'renders amount "$amount" with locale "$locale" and currency "$currency" correctly ("$expected")',
  ({ locale, amount, currency, expectedReact, expectedFn }) => {
    const { container } = render(
      <SxDesignProvider locale={locale}>
        <Money priceUnitAmount={amount} priceUnitAmountCurrency={currency} />
      </SxDesignProvider>,
    );
    expect(container.innerHTML).toBe(expectedReact);

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
