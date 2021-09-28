/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import fbt from 'fbt';

import ButtonLink from '../ButtonLink';
import { initFbt, render, userEvent } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('calls onClick event', () => {
  const onClickFn = jest.fn();

  const { getByText } = render(
    <ButtonLink onClick={onClickFn}>
      <fbt desc="button link title" doNotExtract={true}>
        button link with onClick callback
      </fbt>
    </ButtonLink>,
  );

  expect(getByText('button link with onClick callback')).toBeDefined();
  expect(onClickFn).not.toHaveBeenCalled();

  userEvent.click(getByText('button link with onClick callback'));
  expect(onClickFn).toHaveBeenCalledTimes(1);
});
