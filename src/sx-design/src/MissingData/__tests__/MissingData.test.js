/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';

import MissingData from '../MissingData';
import { render, userEvent } from '../../test-utils';

it('works as expected without any crashes', () => {
  const { queryByText, getByText } = render(<MissingData />);

  // By default the text is hidden (via CSS visibility, see `Tooltip`):
  expect(getByText('Unable to load data or missing data.')).toBeDefined();
  expect(
    window.getComputedStyle(queryByText('Unable to load data or missing data.')).visibility,
  ).toBe('hidden');

  // We have to uncover it:
  userEvent.hover(getByText('N/A'));

  // And now we should be able to find it:
  expect(getByText('Unable to load data or missing data.')).toBeDefined();
  expect(
    window.getComputedStyle(queryByText('Unable to load data or missing data.')).visibility,
  ).toBe('visible');
});
