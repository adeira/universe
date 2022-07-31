/**
 * @flow
 * @jest-environment jsdom
 */

import Icon from '@adeira/icons';
import React from 'react';
import '@adeira/sx-jest-snapshot-serializer';
import fbt from 'fbt';
import NextLink from 'next/link';

import LinkButton from '../LinkButton';
import { initFbt, renderWithoutProviders, userEvent } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('does not call onClick event when disabled', async () => {
  const onClickFn = jest.fn();

  const { getByText } = renderWithoutProviders(
    <LinkButton nextLinkComponent={NextLink} href="#" onClick={onClickFn} isDisabled={true}>
      <fbt desc="link button title" doNotExtract={true}>
        link button with onClick callback
      </fbt>
    </LinkButton>,
  );

  expect(getByText('link button with onClick callback')).toBeInTheDocument();
  expect(onClickFn).not.toHaveBeenCalled();

  await userEvent.click(getByText('link button with onClick callback'));
  expect(onClickFn).not.toHaveBeenCalled();
});

it('renders prefix and suffix icons', async () => {
  const { getByText, findByTestId } = renderWithoutProviders(
    <LinkButton
      nextLinkComponent={NextLink}
      href="https://localhost"
      prefix={<Icon name="door" data-testid="door_icon" />}
      suffix={<Icon name="receipt" data-testid="receipt_icon" />}
    >
      <fbt desc="link button title" doNotExtract={true}>
        link button title
      </fbt>
    </LinkButton>,
  );

  expect(getByText('link button title')).toBeInTheDocument();

  // $FlowFixMe[prop-missing]: missing types for `*.resolves.toBeInTheDocument()`
  await expect(findByTestId('door_icon')).resolves.toBeInTheDocument();
  // $FlowFixMe[prop-missing]: missing types for `*.resolves.toBeInTheDocument()`
  await expect(findByTestId('receipt_icon')).resolves.toBeInTheDocument();
});
