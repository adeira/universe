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

describe('throw for situations resulting in invalid HTML', () => {
  let consoleSpy;
  beforeEach(() => {
    // we ignore React "uncaught" errors for these tests
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('p inside p', () => {
    expect(() =>
      render(
        <Text as="p">
          <Text as="p">invalid nesting</Text>
        </Text>,
      ),
    ).toThrowErrorMatchingSnapshot();
  });

  test('p inside small', () => {
    expect(() =>
      render(
        <Text as="small">
          <Text as="p">invalid nesting</Text>
        </Text>,
      ),
    ).toThrowErrorMatchingSnapshot();
  });

  test('p inside h1', () => {
    expect(() =>
      render(
        <Text as="h1">
          <Text as="p">invalid nesting</Text>
        </Text>,
      ),
    ).toThrowErrorMatchingSnapshot();
  });

  test('h2 inside h1', () => {
    expect(() =>
      render(
        <Text as="h1">
          <Text as="h2">invalid nesting</Text>
        </Text>,
      ),
    ).toThrowErrorMatchingSnapshot();
  });
});

describe('allow nesting resulting in valid HTML', () => {
  it('div inside div', () => {
    const { getByText } = render(
      <Text as="div">
        <Text as="div">valid nesting</Text>
      </Text>,
    );
    expect(getByText('valid nesting')).toBeDefined();
  });

  it('small inside small', () => {
    const { getByText } = render(
      <Text as="small">
        <Text as="small">valid nesting</Text>
      </Text>,
    );
    expect(getByText('valid nesting')).toBeDefined();
  });

  test('small inside p', () => {
    const { getByText } = render(
      <Text as="p">
        <Text as="small">valid nesting</Text>
      </Text>,
    );
    expect(getByText('valid nesting')).toBeDefined();
  });

  // test('unknown inside unknown', () => {
  //   // this is here just to make sure that we allow nesting by default (for some future HTML tags)
  //   const { getByText } = render(
  //     <Text as="unknown">
  //       <Text as="unknown">valid nesting</Text>
  //     </Text>,
  //   );
  //   expect(getByText('valid nesting')).toBeDefined();
  // });
});
