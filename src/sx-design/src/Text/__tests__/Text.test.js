/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import { fbt } from 'fbt';
import util from 'util';

import Text from '../Text';
import { initFbt, render } from '../../test-utils';

beforeEach(() => {
  initFbt();
});

it('renders default Text component without any issues', () => {
  const { getByText } = render(
    <Text>
      <fbt desc="test text description" doNotExtract={true}>
        test text
      </fbt>
    </Text>,
  );

  expect(getByText('test text')).toBeInTheDocument();
  expect(getByText('test text')?.nodeName.toUpperCase()).toBe('P');
});

test.each(['capitalize', 'lowercase', 'uppercase'])(
  'renders correctly with text transform: %s',
  (textTransform) => {
    const { getByText } = render(
      <Text transform={textTransform}>
        <fbt desc="test text description" doNotExtract={true}>
          test text
        </fbt>
      </Text>,
    );

    expect(getByText('test text')).toHaveStyle({ textTransform });
  },
);

test.each([900, 800, 700, 600, 500, 400, 300, 200, 100])(
  'renders correctly with font weight: %s',
  (fontWeight) => {
    const { getByText } = render(
      <Text weight={fontWeight}>
        <fbt desc="test text description" doNotExtract={true}>
          test text
        </fbt>
      </Text>,
    );

    expect(getByText('test text')).not.toHaveStyle({ fontWeight: 950 });
    expect(getByText('test text')).toHaveStyle({ fontWeight });
  },
);

test.each(['p', 'small', 'code', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])(
  'renders correctly as: %s',
  (as) => {
    const { getByTestId } = render(
      <Text as={as} data-testid="text_test_id">
        <fbt desc="test text description" doNotExtract={true}>
          test text
        </fbt>
      </Text>,
    );

    expect(getByTestId('text_test_id')?.nodeName.toLowerCase()).toBe(as);
  },
);

it('prints warning when incorrectly nesting HTML nodes', () => {
  // Technically, the following warning comes from React but we want to make sure it really works
  // since we purposefully opted-in to ignore these cases in `Text` component and rely solely on
  // this React warning (in order to make the SX Design code smaller and more performant).

  const capturedConsoleCalls = [];
  const consoleErrorSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(function (format, ...args) {
      const warningMessage = util.format(format, ...args);
      capturedConsoleCalls.push(warningMessage.substring(0, warningMessage.indexOf('\n')));
    });

  const { getByText } = render(
    <Text as="p">
      <Text as="p">invalid nesting</Text>
    </Text>,
  );

  expect(getByText('invalid nesting')).toBeInTheDocument();
  expect(capturedConsoleCalls).toMatchInlineSnapshot(`
    Array [
      "Warning: validateDOMNesting(...): <p> cannot appear as a descendant of <p>.",
    ]
  `);

  consoleErrorSpy.mockRestore();
});
