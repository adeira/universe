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

it('renders Skeleton component with children without any problems', () => {
  const { getByTestId } = render(
    <Skeleton data-testid="skeleton_with_children">
      <div data-testid="children">children</div>
    </Skeleton>,
  );
  expect(getByTestId('skeleton_with_children')).toBeDefined();
  expect(getByTestId('children')).toBeDefined();
});

it('throws when `show` property is used incorrectly', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => {
    render(<Skeleton data-testid="default_skeleton" show={false} />);
  }).toThrowErrorMatchingInlineSnapshot(`"Property \`show\` can be used only with \`children\`."`);

  spy.mockRestore();
});
