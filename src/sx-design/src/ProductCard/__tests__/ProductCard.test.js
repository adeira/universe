// @flow

import { render } from '@testing-library/react';
import React from 'react';

import SxDesignProvider from '../../SxDesignProvider';
import ProductCard from '../ProductCard';

it.each([
  [
    'en-US',
    'MX$12.00',
    "You should specify alternative image text via `imgAlt` property. This is an important part of accessibility for screen reader users in order for them to understand the content's purpose on the page.",
  ],
  [
    'es-MX',
    '$12.00',
    'Debe especificar un texto de imagen alternativo a través de la propiedad `imgAlt`. Esta es una parte importante de la accesibilidad para los lectores de pantalla, con el fin de que entiendan el propósito del contenido de la página.',
  ],
])('works as expected for locale "%s"', (locale, expectedPrice, expectedWarning) => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});

  const { getByText } = render(
    <SxDesignProvider locale={locale}>
      <ProductCard
        title={'title'}
        priceUnitAmount={12}
        priceUnitAmountCurrency={'MXN'}
        imgSrc={'src'}
      />
      ,
    </SxDesignProvider>,
  );

  expect(getByText('title')).toBeDefined();
  expect(getByText(expectedPrice)).toBeDefined();

  expect(warnSpy).toBeCalledWith(expectedWarning);
  warnSpy.mockRestore();
});
