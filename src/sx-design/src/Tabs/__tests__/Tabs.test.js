/**
 * @flow
 * @jest-environment jsdom
 */

import { fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { fbt } from 'fbt';

import Tabs from '../Tabs';
import { initFbt, render } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

function TestComponentFruits() {
  const [selected, setSelected] = useState('apple');
  return (
    <Tabs
      selected={selected}
      setSelected={setSelected}
      tabs={[
        {
          title: (
            <fbt desc="apple" doNotExtract={true}>
              Apple tab title
              <fbt:param name="selected">{selected === 'apple' ? '(selected)' : ''}</fbt:param>
            </fbt>
          ),
          value: 'apple',
        },
        {
          title: (
            <fbt desc="orange" doNotExtract={true}>
              Orange tab title
              <fbt:param name="selected">{selected === 'orange' ? '(selected)' : ''}</fbt:param>
            </fbt>
          ),
          value: 'orange',
        },
        {
          title: (
            <fbt desc="mango" doNotExtract={true}>
              Mango tab title
              <fbt:param name="selected">{selected === 'mango' ? '(selected)' : ''}</fbt:param>
            </fbt>
          ),
          value: 'mango',
        },
      ]}
    />
  );
}

function TestComponentNumbers() {
  const [selected, setSelected] = useState(null);
  return (
    <Tabs
      selected={selected}
      setSelected={setSelected}
      tabs={[
        {
          title: (
            <fbt desc="0" doNotExtract={true}>
              0
              <fbt:param name="selected">{selected === null ? '(selected)' : ''}</fbt:param>
            </fbt>
          ),
          value: null,
        },
        {
          title: (
            <fbt desc="1" doNotExtract={true}>
              1
              <fbt:param name="selected">{selected === 1 ? '(selected)' : ''}</fbt:param>
            </fbt>
          ),
          value: 1,
        },
        {
          title: (
            <fbt desc="2" doNotExtract={true}>
              2
              <fbt:param name="selected">{selected === 2 ? '(selected)' : ''}</fbt:param>
            </fbt>
          ),
          value: 2,
        },
      ]}
    />
  );
}

it('renders default tabs without any issues', () => {
  const { getByText } = render(<TestComponentFruits />);

  expect(getByText('Apple tab title (selected)')).toBeDefined();
  expect(getByText('Orange tab title')).toBeDefined();
  expect(getByText('Mango tab title')).toBeDefined();
});

it('handles clicks as expected', () => {
  const { getByText } = render(<TestComponentFruits />);

  expect(getByText('Apple tab title (selected)')).toBeDefined();
  expect(getByText('Orange tab title')).toBeDefined();
  expect(getByText('Mango tab title')).toBeDefined();

  fireEvent.click(getByText('Mango tab title'));

  expect(getByText('Apple tab title')).toBeDefined();
  expect(getByText('Orange tab title')).toBeDefined();
  expect(getByText('Mango tab title (selected)')).toBeDefined();
});

it('supports null and number values', () => {
  const { getByText } = render(<TestComponentNumbers />);

  expect(getByText('0 (selected)')).toBeDefined();
  expect(getByText('1')).toBeDefined();
  expect(getByText('2')).toBeDefined();

  fireEvent.click(getByText('1'));

  expect(getByText('0')).toBeDefined();
  expect(getByText('1 (selected)')).toBeDefined();
  expect(getByText('2')).toBeDefined();
});
