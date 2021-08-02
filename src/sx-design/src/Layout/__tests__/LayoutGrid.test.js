/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import LayoutGrid from '../LayoutGrid';
import Placeholder from '../../Placeholder/Placeholder';
import { initFbt, render } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it.each`
  spacing     | expectedGap
  ${'none'}   | ${'0px'}
  ${'small'}  | ${'var(--sx-spacing-small)'}
  ${'medium'} | ${'var(--sx-spacing-medium)'}
  ${'large'}  | ${'var(--sx-spacing-large)'}
`('renders LayoutGrid without any issues with spacing: $spacing', ({ spacing, expectedGap }) => {
  const { getByTestId } = render(
    <LayoutGrid data-testid="layout_grid_test_id" spacing={spacing}>
      <Placeholder width={100} height={100} />
      <Placeholder width={100} height={100} />
      <Placeholder width={100} height={100} />
    </LayoutGrid>,
  );
  expect(getByTestId('layout_grid_test_id')).toBeDefined();
  expect(getByTestId('layout_grid_test_id')).toHaveStyle({ gap: expectedGap });
});
