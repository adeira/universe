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

it('calls onClick event', async () => {
  /* $FlowFixMe[underconstrained-implicit-instantiation] This comment
   * suppresses an error when upgrading Flow to version 0.204.1. To see the
   * error delete this comment and run Flow. */
  const onClickFn = jest.fn();

  const { getByText } = render(
    <ButtonLink onClick={onClickFn}>
      <fbt desc="button link title" doNotExtract={true}>
        button link with onClick callback
      </fbt>
    </ButtonLink>,
  );

  expect(getByText('button link with onClick callback')).toBeInTheDocument();
  expect(onClickFn).not.toHaveBeenCalled();

  await userEvent.click(getByText('button link with onClick callback'));
  expect(onClickFn).toHaveBeenCalledTimes(1);
});
