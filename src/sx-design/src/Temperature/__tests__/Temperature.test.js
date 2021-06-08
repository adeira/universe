/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';

import SxDesignProvider from '../../SxDesignProvider';
import Temperature from '../Temperature';

test.each`
  locale     | temperature | expected
  ${'en-US'} | ${-40}      | ${'-40 °F'}
  ${'en-US'} | ${0}        | ${'32 °F'}
  ${'cs-CZ'} | ${80}       | ${'80 °C'}
  ${'es-MX'} | ${80}       | ${'80 °C'}
  ${'en-US'} | ${80}       | ${'176 °F'}
  ${'en-US'} | ${91}       | ${'196 °F'}
  ${'en-US'} | ${100}      | ${'212 °F'}
`(
  'correctly renders temperature "$temperature °C" for locale "$locale" (expected "$expected")',
  ({ locale, temperature, expected }) => {
    const { getByText } = render(
      <SxDesignProvider locale={locale}>
        <Temperature degreesCelsius={temperature} />
      </SxDesignProvider>,
    );
    expect(getByText(expected)).toBeDefined();
  },
);
