/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import EntityField from '../EntityField';
import { render } from '../../test-utils';

it('renders EntityField component without any problems - title', () => {
  const { getByText } = render(<EntityField title="test title" />);
  expect(getByText('test title')).toBeInTheDocument();
});

it('renders EntityField component without any problems - description', () => {
  const { getByText } = render(<EntityField description="test description" />);
  expect(getByText('test description')).toBeInTheDocument();
});

it('renders EntityField component without any problems - title and description', () => {
  const { getByText } = render(<EntityField title="test title" description="test description" />);
  expect(getByText('test title')).toBeInTheDocument();
  expect(getByText('test description')).toBeInTheDocument();
});

it('throws an error when used without title and without description', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => render(<EntityField />)).toThrowErrorMatchingInlineSnapshot(
    `"EntityField component has to have title or description (or both)."`,
  );

  consoleSpy.mockRestore();
});
