/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import DateTime from '../DateTime';
import SxDesignProvider from '../../SxDesignProvider';
import { render } from '../../test-utils';

const dateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

it('works correctly for `en-US` locale', () => {
  const { getByText } = render(
    <SxDesignProvider locale="en-US">
      <DateTime value="2022-04-16T01:00:00.000Z" formatOptions={dateTimeFormatOptions} />
    </SxDesignProvider>,
  );
  expect(getByText('Apr 16, 2022, 1:00:00 AM')).toBeInTheDocument();
});

it('works correctly for `es-MX` locale', () => {
  const { getByText } = render(
    <SxDesignProvider locale="es-MX">
      <DateTime value="2022-04-16T01:00:00.000Z" formatOptions={dateTimeFormatOptions} />
    </SxDesignProvider>,
  );
  expect(getByText('16 abr 2022 01:00:00')).toBeInTheDocument();
});

it('works correctly for `cs-CZ` locale', () => {
  const { getByText } = render(
    <SxDesignProvider locale="cs-CZ">
      <DateTime value="2022-04-16T01:00:00.000Z" formatOptions={dateTimeFormatOptions} />
    </SxDesignProvider>,
  );
  expect(getByText('16. 4. 2022 1:00:00')).toBeInTheDocument();
});
