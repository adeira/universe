/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import DateTime from '../DateTime';
import { render } from '../../test-utils';

// TODO: How to deal with this? (Internally using Icon which uses Suspense)
//  See: https://github.com/reactwg/react-18/discussions/102
let prevIsReactActEnvironment;
beforeAll(() => {
  prevIsReactActEnvironment = global.IS_REACT_ACT_ENVIRONMENT;
  global.IS_REACT_ACT_ENVIRONMENT = false;
});

afterAll(() => {
  global.IS_REACT_ACT_ENVIRONMENT = prevIsReactActEnvironment;
});

const dateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

it('works correctly without format options', () => {
  const { getByText } = render(<DateTime value="2022-04-16T01:00:00.000Z" />, {
    locale: 'en-US',
  });
  expect(getByText('Apr 16, 2022')).toBeInTheDocument();
});

it('works correctly for `en-US` locale', () => {
  const { getByText } = render(
    <DateTime value="2022-04-16T01:00:00.000Z" formatOptions={dateTimeFormatOptions} />,
    { locale: 'en-US' },
  );
  expect(getByText('Apr 16, 2022, 1:00:00 AM')).toBeInTheDocument();
});

it('works correctly for `es-MX` locale', () => {
  const { getByText } = render(
    <DateTime value="2022-04-16T01:00:00.000Z" formatOptions={dateTimeFormatOptions} />,
    { locale: 'es-MX' },
  );

  if (Number(process.versions.icu) >= 74.1) {
    // Change in ICU 74.1 (https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V21.md#21.3.0)
    expect(getByText('16 abr 2022, 1:00:00 a.m.')).toBeInTheDocument();
  } else if (Number(process.versions.icu) >= 72.1) {
    // Change in ICU 72.1 (https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V19.md#19.1.0)
    expect(getByText('16 abr 2022, 01:00:00')).toBeInTheDocument();
  } else {
    expect(getByText('16 abr 2022 01:00:00')).toBeInTheDocument();
  }
});

it('works correctly for `cs-CZ` locale', () => {
  const { getByText } = render(
    <DateTime value="2022-04-16T01:00:00.000Z" formatOptions={dateTimeFormatOptions} />,
    { locale: 'cs-CZ' },
  );
  expect(getByText('16. 4. 2022 1:00:00')).toBeInTheDocument();
});

it('works correctly with additional format options', () => {
  const { getByText } = render(
    <DateTime
      value="2022-04-16T01:00:00.000Z"
      formatOptions={{
        weekday: 'long',
        era: 'long',
        year: 'numeric',
        month: 'long',
        timeZoneName: 'long',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }}
    />,
    { locale: 'cs-CZ' },
  );

  if (Number(process.versions.icu) >= 72.1) {
    // Change in ICU 72.1 (https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V19.md#19.1.0)
    expect(
      getByText('sobota 16. dubna 2022 našeho letopočtu v 1:00:00, koordinovaný světový čas'),
    ).toBeInTheDocument();
  } else {
    expect(
      getByText('sobota 16. dubna 2022 našeho letopočtu 1:00:00 Koordinovaný světový čas'),
    ).toBeInTheDocument();
  }
});

it('handles invalid date value gracefully', () => {
  const { getByText } = render(<DateTime value="invalid date value" />, {
    locale: 'en-US',
  });
  expect(getByText('Invalid date/time value')).toBeInTheDocument();
});
