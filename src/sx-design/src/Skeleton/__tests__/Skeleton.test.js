/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import Skeleton from '../Skeleton';
import { render } from '../../test-utils';

it('renders default Skeleton component without any problems', () => {
  const { getByTestId } = render(<Skeleton data-testid="default_skeleton" />);
  expect(getByTestId('default_skeleton')).toBeInTheDocument();
});

it('renders Skeleton component with children without any problems', () => {
  const { getByTestId } = render(
    <Skeleton data-testid="skeleton_with_children">
      <div data-testid="children">children</div>
    </Skeleton>,
  );
  expect(getByTestId('skeleton_with_children')).toBeInTheDocument();
  expect(getByTestId('children')).toBeInTheDocument();
});

it('throws when `show` property is used incorrectly', () => {
  const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => {
    render(<Skeleton data-testid="default_skeleton" show={false} />);
  }).toThrowErrorMatchingInlineSnapshot(`"Property \`show\` can be used only with \`children\`."`);

  spy.mockRestore();
});
