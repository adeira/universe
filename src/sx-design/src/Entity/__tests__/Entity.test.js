/**
 * @flow
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import React from 'react';

import Entity from '../Entity';
import EntityField from '../EntityField';

it('renders Entity component without any problems', () => {
  const { getByText } = render(
    <Entity>
      <EntityField title="Test title 1" />
      <EntityField title="Test title 2" />
      <EntityField title="Test title 3" />
    </Entity>,
  );
  expect(getByText('Test title 1')).toBeDefined();
  expect(getByText('Test title 2')).toBeDefined();
  expect(getByText('Test title 3')).toBeDefined();
});

it('throws an error when used without any children', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // $FlowExpectedError[prop-missing]: missing required children (on purpose)
  expect(() => render(<Entity />)).toThrowErrorMatchingInlineSnapshot(
    `"Component \`Entity\` has to be called with at least one \`EntityField\` children."`,
  );

  consoleSpy.mockRestore();
});
