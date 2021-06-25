/**
 * @flow
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';
import fbt from 'fbt';

import Emoji from '../Emoji';
import { initFbt } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('renders Emoji component without any problems', () => {
  const { getByText, getByRole } = render(
    <Emoji
      symbol="✅"
      label={
        <fbt desc="check mark symbol label" doNotExtract={true}>
          check mark symbol
        </fbt>
      }
    />,
  );
  expect(getByText('✅')).toBeDefined();
  expect(getByRole('img')).toEqual(getByText('✅'));
});
