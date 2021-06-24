/**
 * @flow
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';

import Skeleton from '../Skeleton';

it('renders default Skeleton component without any problems', () => {
  const { getByTestId } = render(<Skeleton data-testid="default_skeleton" />);
  expect(getByTestId('default_skeleton')).toBeDefined();
});

it('renders squared Skeleton component without any problems', () => {
  const { getByTestId } = render(<Skeleton data-testid="squared_skeleton" squared={true} />);
  expect(getByTestId('squared_skeleton')).toBeDefined();
});
