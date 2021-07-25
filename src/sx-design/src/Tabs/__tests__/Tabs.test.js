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

function TestComponent() {
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

it('renders default tabs without any issues', () => {
  const { getByText } = render(<TestComponent />);

  expect(getByText('Apple tab title (selected)')).toBeDefined();
  expect(getByText('Orange tab title')).toBeDefined();
  expect(getByText('Mango tab title')).toBeDefined();
});

it('handles clicks as expected', () => {
  const { getByText } = render(<TestComponent />);

  expect(getByText('Apple tab title (selected)')).toBeDefined();
  expect(getByText('Orange tab title')).toBeDefined();
  expect(getByText('Mango tab title')).toBeDefined();

  fireEvent.click(getByText('Mango tab title'));

  expect(getByText('Apple tab title')).toBeDefined();
  expect(getByText('Orange tab title')).toBeDefined();
  expect(getByText('Mango tab title (selected)')).toBeDefined();
});
