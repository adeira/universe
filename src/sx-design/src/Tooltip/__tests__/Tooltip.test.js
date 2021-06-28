/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import fbt from 'fbt';

import SxDesignProvider from '../../SxDesignProvider';
import Tooltip from '../Tooltip';
import { initFbt, render, fireEvent } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('renders and behaves as expected', () => {
  const { queryByText, getByText, getByTestId } = render(
    <SxDesignProvider>
      <Tooltip data-testid="hover_over_me">
        <fbt desc="test tooltip content title" doNotExtract={true}>
          test tooltip content
        </fbt>
      </Tooltip>
    </SxDesignProvider>,
  );

  // By default the text is hidden:
  expect(queryByText('test tooltip content')).toBeNull();

  // We have to uncover it:
  fireEvent.mouseOver(getByTestId('hover_over_me'));

  // And now we should be able to find it:
  expect(getByText('test tooltip content')).toBeDefined();
});

it('throws an error when HTML node with ID #react-portal-root is missing', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  const { queryByText, getByTestId } = render(
    <Tooltip data-testid="hover_over_me">
      <fbt desc="test tooltip content title" doNotExtract={true}>
        test tooltip content
      </fbt>
    </Tooltip>,
  );

  // By default the text is hidden:
  expect(queryByText('test tooltip content')).toBeNull();

  // It should fail when we try to uncover it and there is no HTML node with ID #react-portal-root
  // so we cannot create a React Portal for this tooltip:
  expect(() =>
    fireEvent.mouseOver(getByTestId('hover_over_me')),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Tooltip component requires HTML node with ID \\"#react-portal-root\\" (none was found). Did you forget to call \\"<SxDesignProvider />\\" somewhere in the application root?"`,
  );

  consoleSpy.mockRestore();
});
