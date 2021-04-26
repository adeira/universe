// @flow

import { render } from '@testing-library/react';
import React from 'react';

import SxDesignProvider from '../../SxDesignProvider';
import ProductCard from '../ProductCard';

it.each([
  ['en-US', 'MXN', 'MX$12.00'],
  ['en-US', 'USD', '$12.00'],
  ['es-MX', 'MXN', '$12.00'],
])('works as expected for locale "%s" and currency "%s"', (locale, currency, expectedPrice) => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});

  const { getByText } = render(
    <SxDesignProvider locale={locale}>
      <ProductCard
        title={'title'}
        priceUnitAmount={12}
        priceUnitAmountCurrency={currency}
        imgSrc={'src'}
      />
      ,
    </SxDesignProvider>,
  );

  expect(getByText('title')).toBeDefined();
  expect(getByText(expectedPrice)).toBeDefined();

  expect(warnSpy).toBeCalledWith(
    "You should specify alternative image text via `alt` property. This is an important part of accessibility for screen reader users in order for them to understand the content's purpose on the page.",
  );
  warnSpy.mockRestore();
});
