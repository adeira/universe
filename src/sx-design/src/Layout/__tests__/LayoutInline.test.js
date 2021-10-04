/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import LayoutInline from '../LayoutInline';
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
`('renders LayoutInline without any issues with spacing: $spacing', ({ spacing, expectedGap }) => {
  const { getByTestId } = render(
    <LayoutInline data-testid="layout_inline_test_id" spacing={spacing}>
      <Placeholder width={100} height={100} />
      <Placeholder width={100} height={100} />
      <Placeholder width={100} height={100} />
    </LayoutInline>,
  );
  expect(getByTestId('layout_inline_test_id')).toBeInTheDocument();
  expect(getByTestId('layout_inline_test_id')).toHaveStyle({ gap: expectedGap });
});
