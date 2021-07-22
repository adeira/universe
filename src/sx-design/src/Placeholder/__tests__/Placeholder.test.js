/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import fbt from 'fbt';

import Placeholder from '../Placeholder';
import { initFbt, render } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('renders the default placeholder without any issues', () => {
  const { getByTestId } = render(<Placeholder width={100} height={100} />);
  expect(getByTestId('placeholder-svg')).toBeDefined();
});

it('renders placeholder with label without any issues', () => {
  const { getByText, queryByTestId } = render(
    <Placeholder
      width={100}
      height={100}
      label={
        <fbt desc="placeholder label" doNotExtract={true}>
          placeholder label
        </fbt>
      }
    />,
  );
  expect(getByText('placeholder label')).toBeDefined();
  expect(queryByTestId('placeholder-svg')).toBeNull();
});
