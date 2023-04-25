/**
 * @flow
 * @jest-environment jsdom
 */

import Icon from '@adeira/icons';
import React from 'react';
import fbt from 'fbt';

import Button from '../Button';
import { initFbt, render, userEvent } from '../../test-utils';

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

  expect(getByText('button title')).toBeInTheDocument();
});

it('renders prefix and suffix icons', async () => {
  const { getByText, findByTestId } = render(
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

  expect(getByText('button title')).toBeInTheDocument();

  // $FlowFixMe[prop-missing]: missing types for `*.resolves.toBeInTheDocument()`
  await expect(findByTestId('door_icon')).resolves.toBeInTheDocument();
  // $FlowFixMe[prop-missing]: missing types for `*.resolves.toBeInTheDocument()`
  await expect(findByTestId('receipt_icon')).resolves.toBeInTheDocument();
});

it('calls onClick event', async () => {
  /* $FlowFixMe[underconstrained-implicit-instantiation] This comment
   * suppresses an error when upgrading Flow to version 0.204.1. To see the
   * error delete this comment and run Flow. */
  const onClickFn = jest.fn();

  const { getByText } = render(
    <Button onClick={onClickFn}>
      <fbt desc="button title" doNotExtract={true}>
        button with onClick callback
      </fbt>
    </Button>,
  );

  expect(getByText('button with onClick callback')).toBeInTheDocument();
  expect(onClickFn).not.toHaveBeenCalled();

  await userEvent.click(getByText('button with onClick callback'));
  expect(onClickFn).toHaveBeenCalledTimes(1);
});

it('does not call onClick event when the button is disabled', async () => {
  /* $FlowFixMe[underconstrained-implicit-instantiation] This comment
   * suppresses an error when upgrading Flow to version 0.204.1. To see the
   * error delete this comment and run Flow. */
  const onClickFn = jest.fn();

  const { getByText } = render(
    <Button onClick={onClickFn} isDisabled={true}>
      <fbt desc="button title" doNotExtract={true}>
        disabled button with onClick callback
      </fbt>
    </Button>,
  );

  expect(getByText('disabled button with onClick callback')).toBeInTheDocument();
  expect(onClickFn).not.toHaveBeenCalled();

  await userEvent.click(getByText('disabled button with onClick callback'));
  expect(onClickFn).not.toHaveBeenCalled();
});

it('throws when Icon is the only Button child and ARIA label is not specified', async () => {
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

  const { findByTestId } = render(
    <Button onClick={jest.fn()} aria-label="Timeline button">
      <Icon name="timeline" data-testid="timeline_icon" />
    </Button>,
  );

  // $FlowFixMe[prop-missing]: missing types for `*.resolves.toBeInTheDocument()`
  await expect(findByTestId('timeline_icon')).resolves.toBeInTheDocument();
});
