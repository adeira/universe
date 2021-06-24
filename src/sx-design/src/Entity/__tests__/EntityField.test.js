/**
 * @flow
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';

import EntityField from '../EntityField';

it('renders EntityField component without any problems - title', () => {
  const { getByText } = render(<EntityField title="test title" />);
  expect(getByText('test title')).toBeDefined();
});

it('renders EntityField component without any problems - description', () => {
  const { getByText } = render(<EntityField description="test description" />);
  expect(getByText('test description')).toBeDefined();
});

it('renders EntityField component without any problems - title and description', () => {
  const { getByText } = render(<EntityField title="test title" description="test description" />);
  expect(getByText('test title')).toBeDefined();
  expect(getByText('test description')).toBeDefined();
});

it('throws an error when used without title and without description', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  expect(() => render(<EntityField />)).toThrowErrorMatchingInlineSnapshot(
    `"EntityField component has to have title or description (or both)."`,
  );

  consoleSpy.mockRestore();
});
