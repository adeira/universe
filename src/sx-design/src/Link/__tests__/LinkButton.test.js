/**
 * @flow
 * @jest-environment jsdom
 */

import { fireEvent } from '@testing-library/react';
import React from 'react';
import '@adeira/sx-jest-snapshot-serializer';
import fbt from 'fbt';

import LinkButton from '../LinkButton';
import { initFbt, render } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('forwards React refs as expected', () => {
  const ref = React.createRef();
  const { container } = render(
    <LinkButton ref={ref} href="https://localhost">
      <fbt desc="button link title" doNotExtract={true}>
        button link
      </fbt>
    </LinkButton>,
  );

  expect(ref.current).toBe(container.firstChild);
  expect(ref.current?.nodeName).toBe('A');
});

it('calls onClick event', () => {
  const onClickFn = jest.fn();

  const { getByText } = render(
    <LinkButton href="https://localhost" onClick={onClickFn}>
      <fbt desc="button link title" doNotExtract={true}>
        button link with onClick callback
      </fbt>
    </LinkButton>,
  );

  expect(getByText('button link with onClick callback')).toBeDefined();
  expect(onClickFn).not.toHaveBeenCalled();

  fireEvent.click(getByText('button link with onClick callback'));
  expect(onClickFn).toHaveBeenCalledTimes(1);
});
