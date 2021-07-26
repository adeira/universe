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
});

describe('text transforms', () => {
  it('renders Text component with transform "capitalize" without any issues', () => {
    const { getByText } = render(
      <Text transform="capitalize">
        <fbt desc="test text description" doNotExtract={true}>
          test text
        </fbt>
      </Text>,
    );

    expect(getByText('test text')).toHaveStyle({ textTransform: 'capitalize' });
  });

  it('renders Text component with transform "lowercase" without any issues', () => {
    const { getByText } = render(
      <Text transform="lowercase">
        <fbt desc="test text description" doNotExtract={true}>
          test text
        </fbt>
      </Text>,
    );

    expect(getByText('test text')).toHaveStyle({ textTransform: 'lowercase' });
  });

  it('renders Text component with transform "uppercase" without any issues', () => {
    const { getByText } = render(
      <Text transform="uppercase">
        <fbt desc="test text description" doNotExtract={true}>
          test text
        </fbt>
      </Text>,
    );

    expect(getByText('test text')).toHaveStyle({ textTransform: 'uppercase' });
  });
});
