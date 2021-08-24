/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import fbt from 'fbt';

import FormCheckboxList from '../FormCheckboxList';
import { customRender, initFbt } from '../private/testUtils';

beforeEach(() => {
  initFbt();
});

it('renders basic "FormCheckboxList" input as expected', () => {
  const { getByText } = customRender(
    <FormCheckboxList
      name="checkbox-list-name"
      selectedValues={['aaa']}
      availableValues={{ aaa: 'AAA', bbb: 'BBB', ccc: 'CCC' }}
      label={
        <fbt doNotExtract={true} desc={'checkbox list label'}>
          checkbox list label
        </fbt>
      }
    />,
  );

  // renders label as expected
  expect(getByText('checkbox list label')).toBeDefined();

  // renders available values as expected
  expect(getByText('AAA')).toBeDefined();
  expect(getByText('BBB')).toBeDefined();
  expect(getByText('CCC')).toBeDefined();
});
