/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import { render, fireEvent } from '../../test-utils';
import FilterChip from '../FilterChip';
import FilterChips from '../FilterChips';

it('renders without any issues', () => {
  const { getByText } = render(
    <FilterChips>
      <FilterChip title="AAA" value="aaa" />
      <FilterChip title="BBB" value="bbb" />
      <FilterChip title="CCC" value="ccc" />
    </FilterChips>,
  );

  expect(getByText('AAA')).toBeDefined();
  expect(getByText('BBB')).toBeDefined();
  expect(getByText('CCC')).toBeDefined();
});

it('calls `onFiltersChange` as expected', () => {
  const onFiltersChangeFn = jest.fn();

  const { getByText } = render(
    <FilterChips onFiltersChange={onFiltersChangeFn}>
      <FilterChip title="AAA" value="aaa" />
      <FilterChip title="BBB" value="bbb" />
      <FilterChip title="CCC" value="ccc" />
    </FilterChips>,
  );

  expect(onFiltersChangeFn).not.toHaveBeenCalledWith();

  // select AAA
  fireEvent.click(getByText('AAA'));
  expect(onFiltersChangeFn).toHaveBeenLastCalledWith(['aaa']);

  // additionally select BBB and CCC
  fireEvent.click(getByText('BBB'));
  fireEvent.click(getByText('CCC'));
  expect(onFiltersChangeFn).toHaveBeenLastCalledWith(['aaa', 'bbb', 'ccc']);

  // unselect BBB
  fireEvent.click(getByText('BBB'));
  expect(onFiltersChangeFn).toHaveBeenLastCalledWith(['aaa', 'ccc']);
});
