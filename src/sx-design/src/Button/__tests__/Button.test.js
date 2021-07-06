/**
 * @flow
 * @jest-environment jsdom
 */

import Icon from '@adeira/icons';
import React from 'react';
import fbt from 'fbt';

import Button from '../Button';
import { initFbt, render, fireEvent } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('calls onClick event', () => {
  const onClickFn = jest.fn();

  const { getByText } = render(
    <Button onClick={onClickFn}>
      <fbt desc="button title" doNotExtract={true}>
        button with onClick callback
      </fbt>
    </Button>,
  );

  expect(getByText('button with onClick callback')).toBeDefined();
  expect(onClickFn).not.toHaveBeenCalled();

  fireEvent.click(getByText('button with onClick callback'));
  expect(onClickFn).toHaveBeenCalledTimes(1);
});

it('renders prefix and suffix icons', () => {
  const onClickFn = jest.fn();

  const { getByText, getByTestId } = render(
    <Button
      onClick={onClickFn}
      prefix={<Icon name="door" data-testid="door_icon" />}
      suffix={<Icon name="receipt" data-testid="receipt_icon" />}
    >
      <fbt desc="button title" doNotExtract={true}>
        button title
      </fbt>
    </Button>,
  );

  expect(getByText('button title')).toBeDefined();
  expect(getByTestId('door_icon')).toBeDefined();
  expect(getByTestId('receipt_icon')).toBeDefined();
});
