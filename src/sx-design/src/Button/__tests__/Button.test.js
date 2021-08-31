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

it('renders without any issues', () => {
  const { getByText } = render(
    <Button onClick={jest.fn()}>
      <fbt desc="button title" doNotExtract={true}>
        button title
      </fbt>
    </Button>,
  );

  expect(getByText('button title')).toBeDefined();
});

it('renders prefix and suffix icons', () => {
  const { getByText, getByTestId } = render(
    <Button
      onClick={jest.fn()}
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

it('does not call onClick event when the button is disabled', () => {
  const onClickFn = jest.fn();

  const { getByText } = render(
    <Button onClick={onClickFn} isDisabled={true}>
      <fbt desc="button title" doNotExtract={true}>
        disabled button with onClick callback
      </fbt>
    </Button>,
  );

  expect(getByText('disabled button with onClick callback')).toBeDefined();
  expect(onClickFn).not.toHaveBeenCalled();

  fireEvent.click(getByText('disabled button with onClick callback'));
  expect(onClickFn).not.toHaveBeenCalled();
});

it('throws when Icon is the only Button child and ARIA label is not specified', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => {
    render(
      <Button onClick={jest.fn()}>
        <Icon name="timeline" data-testid="timeline_icon" />
      </Button>,
    );
  }).toThrowErrorMatchingInlineSnapshot(
    `"Icon is the only Button child so ARIA label property must be specified."`,
  );
  consoleSpy.mockRestore();

  const { getByTestId } = render(
    <Button onClick={jest.fn()} aria-label="Timeline button">
      <Icon name="timeline" data-testid="timeline_icon" />
    </Button>,
  );

  expect(getByTestId('timeline_icon')).toBeDefined();
});
