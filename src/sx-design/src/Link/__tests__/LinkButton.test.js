/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import fbt from 'fbt';

import LinkButton from '../LinkButton';
import { initFbt, render, fireEvent } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('calls onClick event', () => {
  const onClickFn = jest.fn();

  const { getByText } = render(
    <LinkButton onClick={onClickFn}>
      <fbt desc="link title" doNotExtract={true}>
        link button with onClick callback
      </fbt>
    </LinkButton>,
  );

  expect(getByText('link button with onClick callback')).toBeDefined();
  expect(onClickFn).not.toHaveBeenCalled();

  fireEvent.click(getByText('link button with onClick callback'));
  expect(onClickFn).toHaveBeenCalledTimes(1);
});
