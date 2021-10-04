/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';

import { render, userEvent } from '../../test-utils';
import Menu from '../Menu';

it('renders the menu without any issues', () => {
  const { getByRole, getByText, getByTestId, queryByText, queryByTestId } = render(
    <Menu>
      <Menu.Item onClick={jest.fn()}>One</Menu.Item>
      <Menu.Item onClick={jest.fn()}>Two</Menu.Item>
      <Menu.Item tint="default" onClick={jest.fn()}>
        Three
      </Menu.Item>
      <Menu.ItemDivider data-testid="MenuItemDivider" />
      <Menu.Item tint="error" onClick={jest.fn()}>
        Delete
      </Menu.Item>
    </Menu>,
  );

  // Everything is hidden by default (not in the DOM):
  expect(queryByText('One')).not.toBeInTheDocument();
  expect(queryByText('Two')).not.toBeInTheDocument();
  expect(queryByText('Three')).not.toBeInTheDocument();
  expect(queryByTestId('MenuItemDivider')).not.toBeInTheDocument();
  expect(queryByText('Delete')).not.toBeInTheDocument();

  // We have to first open the menu:
  userEvent.click(getByRole('button'));

  // And now everything is visible:
  expect(getByText('One')).toBeInTheDocument();
  expect(getByText('Two')).toBeInTheDocument();
  expect(getByText('Three')).toBeInTheDocument();
  expect(getByTestId('MenuItemDivider')).toBeInTheDocument();
  expect(getByText('Delete')).toBeInTheDocument();
});

it('calls callback correctly when the item is clicked', () => {
  const onClickFn = jest.fn();

  const { getByRole, getByText, queryByText } = render(
    <Menu>
      <Menu.Item onClick={onClickFn}>Click me!</Menu.Item>
    </Menu>,
  );

  // First we need to open the menu because it's closed by default:
  expect(queryByText('Click me!')).not.toBeInTheDocument();
  userEvent.click(getByRole('button'));
  expect(getByText('Click me!')).toBeInTheDocument();

  // Now we can call the menu item which should call the callback:
  userEvent.click(getByText('Click me!'));
  expect(onClickFn).toBeCalledTimes(1);
});
