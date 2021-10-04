/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import Entity from '../Entity';
import EntityField from '../EntityField';
import { render } from '../../test-utils';

it('renders Entity component without any problems', () => {
  const { getByText } = render(
    <Entity>
      <EntityField title="Test title 1" />
      <EntityField title="Test title 2" />
      <EntityField title="Test title 3" />
    </Entity>,
  );
  expect(getByText('Test title 1')).toBeInTheDocument();
  expect(getByText('Test title 2')).toBeInTheDocument();
  expect(getByText('Test title 3')).toBeInTheDocument();
});

it('throws an error when used without any children', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // $FlowExpectedError[prop-missing]: missing required children (on purpose)
  expect(() => render(<Entity />)).toThrowErrorMatchingInlineSnapshot(
    `"Component \`Entity\` has to be called with at least one \`EntityField\` children."`,
  );

  consoleSpy.mockRestore();
});
