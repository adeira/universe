/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import { invariant } from '@adeira/js';

import { render } from '../../test-utils';

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
      const deviceDetect = require('react-device-detect');
      deviceDetect.isMacOs = isMacOs;

      Kbd = require('../Kbd').default;
    });

    invariant(Kbd != null, 'Kbd is not initialized.');

    const { getByText } = render(<Kbd code={code} />);
    expect(getByText(expected)).toBeDefined();
  },
);
