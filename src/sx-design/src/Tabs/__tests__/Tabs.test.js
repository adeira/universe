/**
 * @flow
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import { fbt } from 'fbt';

import Tabs from '../Tabs';
import { initFbt, render, userEvent } from '../../test-utils';

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

  expect(getByText('Apple tab title (selected)')).toBeInTheDocument();
  expect(getByText('Orange tab title')).toBeInTheDocument();
  expect(getByText('Mango tab title')).toBeInTheDocument();
});

it('handles clicks as expected', async () => {
  const { getByText } = render(<TestComponentFruits />);

  expect(getByText('Apple tab title (selected)')).toBeInTheDocument();
  expect(getByText('Orange tab title')).toBeInTheDocument();
  expect(getByText('Mango tab title')).toBeInTheDocument();

  await userEvent.click(getByText('Mango tab title'));

  expect(getByText('Apple tab title')).toBeInTheDocument();
  expect(getByText('Orange tab title')).toBeInTheDocument();
  expect(getByText('Mango tab title (selected)')).toBeInTheDocument();
});

it('supports null and number values', async () => {
  const { getByText } = render(<TestComponentNumbers />);

  expect(getByText('0 (selected)')).toBeInTheDocument();
  expect(getByText('1')).toBeInTheDocument();
  expect(getByText('2')).toBeInTheDocument();

  await userEvent.click(getByText('1'));

  expect(getByText('0')).toBeInTheDocument();
  expect(getByText('1 (selected)')).toBeInTheDocument();
  expect(getByText('2')).toBeInTheDocument();
});

it('correctly handles focus when navigating with right arrow ->', async () => {
  const { getByTestId } = render(<TestComponentFruits />);

  expect(getByTestId('TabsButton-apple')).not.toHaveFocus();
  expect(getByTestId('TabsButton-orange')).not.toHaveFocus();
  expect(getByTestId('TabsButton-mango')).not.toHaveFocus();

  // we press right arrow (->) but it should not have any effect because no tab is currently focused
  await userEvent.keyboard('{arrowright}');

  // we have to focus the button directly - `getByText('Apple…')` would not work
  getByTestId('TabsButton-apple').focus();
  expect(getByTestId('TabsButton-apple')).toHaveFocus();
  expect(getByTestId('TabsButton-orange')).not.toHaveFocus();
  expect(getByTestId('TabsButton-mango')).not.toHaveFocus();

  // ->
  await userEvent.keyboard('{arrowright}');
  expect(getByTestId('TabsButton-apple')).not.toHaveFocus();
  expect(getByTestId('TabsButton-orange')).toHaveFocus();
  expect(getByTestId('TabsButton-mango')).not.toHaveFocus();

  // ->
  await userEvent.keyboard('{arrowright}');
  expect(getByTestId('TabsButton-apple')).not.toHaveFocus();
  expect(getByTestId('TabsButton-orange')).not.toHaveFocus();
  expect(getByTestId('TabsButton-mango')).toHaveFocus();

  // -> (should jump back to the first tab)
  await userEvent.keyboard('{arrowright}');
  expect(getByTestId('TabsButton-apple')).toHaveFocus();
  expect(getByTestId('TabsButton-orange')).not.toHaveFocus();
  expect(getByTestId('TabsButton-mango')).not.toHaveFocus();
});

it('correctly handles focus when navigating with left arrow <-', async () => {
  const { getByTestId } = render(<TestComponentFruits />);

  expect(getByTestId('TabsButton-apple')).not.toHaveFocus();
  expect(getByTestId('TabsButton-orange')).not.toHaveFocus();
  expect(getByTestId('TabsButton-mango')).not.toHaveFocus();

  // we press left arrow (<-) but it should not have any effect because no tab is currently focused
  await userEvent.keyboard('{arrowleft}');

  // we have to focus the button directly - `getByText('Apple…')` would not work
  getByTestId('TabsButton-mango').focus();
  expect(getByTestId('TabsButton-apple')).not.toHaveFocus();
  expect(getByTestId('TabsButton-orange')).not.toHaveFocus();
  expect(getByTestId('TabsButton-mango')).toHaveFocus();

  // <-
  await userEvent.keyboard('{arrowleft}');
  expect(getByTestId('TabsButton-apple')).not.toHaveFocus();
  expect(getByTestId('TabsButton-orange')).toHaveFocus();
  expect(getByTestId('TabsButton-mango')).not.toHaveFocus();

  // <-
  await userEvent.keyboard('{arrowleft}');
  expect(getByTestId('TabsButton-apple')).toHaveFocus();
  expect(getByTestId('TabsButton-orange')).not.toHaveFocus();
  expect(getByTestId('TabsButton-mango')).not.toHaveFocus();

  // <- (should jump back to the last tab)
  await userEvent.keyboard('{arrowleft}');
  expect(getByTestId('TabsButton-apple')).not.toHaveFocus();
  expect(getByTestId('TabsButton-orange')).not.toHaveFocus();
  expect(getByTestId('TabsButton-mango')).toHaveFocus();
});
