/**
 * @flow
 * @jest-environment jsdom
 */

import Icon from '@adeira/icons';
import React from 'react';
import '@adeira/sx-jest-snapshot-serializer';
import fbt from 'fbt';

import LinkButton from '../LinkButton';
import { initFbt, renderWithoutProviders, userEvent } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('forwards React refs as expected', () => {
  const ref = React.createRef();
  const { container } = renderWithoutProviders(
    <LinkButton ref={ref} href="https://localhost">
      <fbt desc="link button title" doNotExtract={true}>
        link button
      </fbt>
    </LinkButton>,
  );

  expect(ref.current).toBe(container.firstChild);
  expect(ref.current?.nodeName).toBe('A');
});

it('calls onClick event', () => {
  const onClickFn = jest.fn();

  const { getByText } = renderWithoutProviders(
    <LinkButton href="https://localhost" onClick={onClickFn}>
      <fbt desc="link button title" doNotExtract={true}>
        link button with onClick callback
      </fbt>
    </LinkButton>,
  );

  expect(getByText('link button with onClick callback')).toBeDefined();
  expect(onClickFn).not.toHaveBeenCalled();

  userEvent.click(getByText('link button with onClick callback'));
  expect(onClickFn).toHaveBeenCalledTimes(1);
});

it('does not call onClick event when disabled', () => {
  const onClickFn = jest.fn();

  const { getByText } = renderWithoutProviders(
    <LinkButton href="https://localhost" onClick={onClickFn} isDisabled={true}>
      <fbt desc="link button title" doNotExtract={true}>
        link button with onClick callback
      </fbt>
    </LinkButton>,
  );

  expect(getByText('link button with onClick callback')).toBeDefined();
  expect(onClickFn).not.toHaveBeenCalled();

  userEvent.click(getByText('link button with onClick callback'));
  expect(onClickFn).not.toHaveBeenCalled();
});

it('renders prefix and suffix icons', () => {
  const { getByText, getByTestId } = renderWithoutProviders(
    <LinkButton
      href="https://localhost"
      prefix={<Icon name="door" data-testid="door_icon" />}
      suffix={<Icon name="receipt" data-testid="receipt_icon" />}
    >
      <fbt desc="link button title" doNotExtract={true}>
        link button title
      </fbt>
    </LinkButton>,
  );

  expect(getByText('link button title')).toBeDefined();
  expect(getByTestId('door_icon')).toBeDefined();
  expect(getByTestId('receipt_icon')).toBeDefined();
});
