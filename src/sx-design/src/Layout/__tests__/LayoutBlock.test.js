/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import LayoutBlock from '../LayoutBlock';
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
`('renders LayoutBlock without any issues with spacing: $spacing', ({ spacing, expectedGap }) => {
  const { getByTestId } = render(
    <LayoutBlock data-testid="layout_block_test_id" spacing={spacing}>
      <Placeholder width={100} height={100} />
      <Placeholder width={100} height={100} />
      <Placeholder width={100} height={100} />
    </LayoutBlock>,
  );
  expect(getByTestId('layout_block_test_id')).toBeDefined();
  expect(getByTestId('layout_block_test_id')).toHaveStyle({ gap: expectedGap });
});
