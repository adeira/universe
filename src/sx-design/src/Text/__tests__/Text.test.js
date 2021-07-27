/**
 * @flow
 * @jest-environment jsdom
 */

import React from 'react';
import { fbt } from 'fbt';

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

  expect(getByText('test text')).toBeDefined();
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

test.each(['p', 'small', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'])(
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
