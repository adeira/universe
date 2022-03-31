/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import DateTime from '../DateTime';
import SxDesignProvider from '../../SxDesignProvider';
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
  const { getByText } = render(
    <SxDesignProvider locale="en-US">
      <DateTime value="2022-04-16T01:00:00.000Z" />
    </SxDesignProvider>,
  );
  expect(getByText('Apr 16, 2022')).toBeInTheDocument();
});

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

it('works correctly with additional format options', () => {
  const { getByText } = render(
    <SxDesignProvider locale="cs-CZ">
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
      />
    </SxDesignProvider>,
  );
  expect(
    getByText('sobota 16. dubna 2022 našeho letopočtu 1:00:00 Koordinovaný světový čas'),
  ).toBeInTheDocument();
});

it('handles invalid date value gracefully', () => {
  const { getByText } = render(
    <SxDesignProvider locale="en-US">
      <DateTime value="invalid date value" />
    </SxDesignProvider>,
  );
  expect(getByText('Invalid date/time value')).toBeInTheDocument();
});
