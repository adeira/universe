/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import Loader from '../Loader';
import { initFbt, render } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('renders the loader without any issues', () => {
  const { getByTestId } = render(<Loader />);
  expect(getByTestId('loader-dot1')).toBeInTheDocument();
  expect(getByTestId('loader-dot2')).toBeInTheDocument();
  expect(getByTestId('loader-dot3')).toBeInTheDocument();
});
