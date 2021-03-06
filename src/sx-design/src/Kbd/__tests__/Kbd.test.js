// @flow

import * as deviceDetect from 'react-device-detect';
import * as React from 'react';
import { invariant } from '@adeira/js';
import { render } from '@testing-library/react';

test.each`
  code       | isMacOs  | expected
  ${'ALT'}   | ${true}  | ${'Option ⌥'}
  ${'ALT'}   | ${false} | ${'Alt'}
  ${'CTRL'}  | ${true}  | ${'Command ⌘'}
  ${'CTRL'}  | ${false} | ${'Ctrl'}
  ${'SHIFT'} | ${true}  | ${'Shift'}
  ${'SHIFT'} | ${false} | ${'Shift'}
`(
  'correctly resolves code $code to "$expected" for mac=$isMacOs',
  ({ code, isMacOs, expected }) => {
    let Kbd;
    jest.isolateModules(() => {
      // https://github.com/duskload/react-device-detect/blob/161b62d7f46a5b810b7a5677985e340f93468e32/README.md#testing
      // eslint-disable-next-line no-import-assign
      deviceDetect.isMacOs = isMacOs;
      Kbd = require('../Kbd').default;
    });

    invariant(Kbd != null, 'Kbd is not initialized.');

    const { getByText } = render(<Kbd code={code} />);
    expect(getByText(expected)).toBeDefined();
  },
);
