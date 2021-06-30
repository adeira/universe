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

it('renders and behaves as expected - default children', () => {
  const { queryByText, getByText, getByTestId } = render(
    <SxDesignProvider>
      <Tooltip
        data-testid="hover_over_me"
        title={
          <fbt desc="test tooltip content title" doNotExtract={true}>
            test tooltip content
          </fbt>
        }
      />
    </SxDesignProvider>,
  );

  // By default the text is hidden (via CSS visibility):
  expect(getByText('test tooltip content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip content')).visibility).toBe('hidden');

  // We have to uncover it:
  fireEvent.mouseOver(getByTestId('hover_over_me'));

  // And now we should be able to find it:
  expect(getByText('test tooltip content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip content')).visibility).toBe('visible');
});

it('renders and behaves as expected - custom children', () => {
  const { queryByText, getByText } = render(
    <SxDesignProvider>
      <Tooltip
        title={
          <fbt desc="test tooltip content title" doNotExtract={true}>
            test tooltip content
          </fbt>
        }
      >
        custom children hover me
      </Tooltip>
    </SxDesignProvider>,
  );

  // By default the text is hidden (via CSS visibility):
  expect(getByText('test tooltip content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip content')).visibility).toBe('hidden');

  // We have to uncover it:
  fireEvent.mouseOver(getByText('custom children hover me'));

  // And now we should be able to find it:
  expect(getByText('test tooltip content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip content')).visibility).toBe('visible');
});

it('throws an error when HTML node with ID #react-portal-root is missing', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // It should fail when we try to render the `Tooltip` and there is no HTML node with ID
  // #sx-design-react-portal-root so we cannot create a React Portal for this tooltip:
  expect(() =>
    render(
      <Tooltip
        data-testid="hover_over_me"
        title={
          <fbt desc="test tooltip content title" doNotExtract={true}>
            test tooltip content
          </fbt>
        }
      />,
    ),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Some components require HTML node with ID \\"#sx-design-react-portal-root\\" (none was found). Did you forget to call \\"<SxDesignProvider />\\" somewhere in the application root?"`,
  );

  consoleSpy.mockRestore();
});
