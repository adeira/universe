/**
 * @flow
 * @jest-environment jsdom
 */

import * as React from 'react';
import fbt from 'fbt';

import Button from '../../Button/Button';
import Tooltip from '../Tooltip';
import { initFbt, render, renderWithoutProviders, userEvent } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('renders and behaves as expected - default children', () => {
  const { queryByText, getByText, getByTestId } = render(
    <Tooltip
      data-testid="hover_over_me"
      title={
        <fbt desc="test tooltip content title" doNotExtract={true}>
          test tooltip content
        </fbt>
      }
    />,
  );

  // By default the text is hidden (via CSS visibility):
  expect(getByText('test tooltip content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip content')).visibility).toBe('hidden');

  // We have to uncover it:
  userEvent.hover(getByTestId('hover_over_me'));

  // And now we should be able to find it:
  expect(getByText('test tooltip content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip content')).visibility).toBe('visible');
});

it('renders and behaves as expected - custom children with mouse hover', () => {
  const { queryByText, getByText } = render(
    <Tooltip
      title={
        <fbt desc="test tooltip content title" doNotExtract={true}>
          test tooltip content
        </fbt>
      }
    >
      custom children hover me
    </Tooltip>,
  );

  // By default the text is hidden (via CSS visibility):
  expect(getByText('test tooltip content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip content')).visibility).toBe('hidden');

  // We have to uncover it (by hovering mouse over):
  userEvent.hover(getByText('custom children hover me'));

  // And now we should be able to find it:
  expect(getByText('test tooltip content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip content')).visibility).toBe('visible');
});

it('renders and behaves as expected - custom children with focus', () => {
  const { queryByText, getByText } = render(
    <Tooltip
      title={
        <fbt desc="test tooltip focus content title" doNotExtract={true}>
          test tooltip focus content
        </fbt>
      }
    >
      <Button onClick={() => {}}>focus me</Button>
    </Tooltip>,
  );

  // By default the text is hidden (via CSS visibility):
  expect(getByText('test tooltip focus content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip focus content')).visibility).toBe(
    'hidden',
  );

  // We have to uncover it (by focusing the button):
  expect(document.body).toHaveFocus();
  userEvent.tab();
  expect(getByText('focus me')).toHaveFocus();

  // And now we should be able to find it:
  expect(getByText('test tooltip focus content')).toBeDefined();
  expect(window.getComputedStyle(queryByText('test tooltip focus content')).visibility).toBe(
    'visible',
  );
});

it('closes on ESC press', () => {
  const { queryByText, getByText, getByTestId } = render(
    <Tooltip
      data-testid="hover_over_me_esc"
      title={
        <fbt desc="esc" doNotExtract={true}>
          close me with ESC
        </fbt>
      }
    />,
  );

  // By default the text is hidden (via CSS visibility):
  expect(getByText('close me with ESC')).toBeDefined();
  expect(window.getComputedStyle(queryByText('close me with ESC')).visibility).toBe('hidden');

  // We have to uncover it:
  userEvent.hover(getByTestId('hover_over_me_esc'));

  // And now we should be able to find it:
  expect(getByText('close me with ESC')).toBeDefined();
  expect(window.getComputedStyle(queryByText('close me with ESC')).visibility).toBe('visible');

  // Let's try to close it by pressing ESC:
  userEvent.keyboard('{esc}');
  expect(getByText('close me with ESC')).toBeDefined();
  expect(window.getComputedStyle(queryByText('close me with ESC')).visibility).toBe('hidden');
});

it('throws an error when HTML node with ID #react-portal-root is missing', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  // It should fail when we try to render the `Tooltip` and there is no HTML node with ID
  // #sx-design-react-portal-root so we cannot create a React Portal for this tooltip:
  expect(() =>
    renderWithoutProviders(
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
