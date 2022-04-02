/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import { render, userEvent } from '../../test-utils';
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

  expect(getByText('AAA')).toBeInTheDocument();
  expect(getByText('BBB')).toBeInTheDocument();
  expect(getByText('CCC')).toBeInTheDocument();
});

it('calls `onFiltersChange` as expected', async () => {
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
  await userEvent.click(getByText('AAA'));
  expect(onFiltersChangeFn).toHaveBeenLastCalledWith(['aaa']);

  // additionally select BBB and CCC
  await userEvent.click(getByText('BBB'));
  await userEvent.click(getByText('CCC'));
  expect(onFiltersChangeFn).toHaveBeenLastCalledWith(['aaa', 'bbb', 'ccc']);

  // unselect BBB
  await userEvent.click(getByText('BBB'));
  expect(onFiltersChangeFn).toHaveBeenLastCalledWith(['aaa', 'ccc']);
});
