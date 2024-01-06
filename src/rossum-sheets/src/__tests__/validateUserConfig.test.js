// @flow

import validateUserConfig from '../validateUserConfig';

it('throws when the columns do not start with "A"', () => {
  expect(() =>
    validateUserConfig({
      sheets: {
        headers: {
          columns: {
            B: 'bbb',
            C: 'ccc',
          },
        },
      },
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"First column must be "A". Please check your configuration."`,
  );
});

it('throws when the columns are not in order', () => {
  expect(() =>
    validateUserConfig({
      sheets: {
        headers: {
          columns: {
            A: 'aaa',
            C: 'ccc',
            B: 'bbb',
          },
        },
      },
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Column C is not following the previous column A in order. All columns must be in order starting with "A". Please check your configuration."`,
  );
});

it('does not throw for valid configuration', () => {
  expect(() =>
    validateUserConfig({
      sheets: {
        headers: {
          columns: {
            A: 'aaa',
            B: 'bbb',
            C: 'ccc',
          },
        },
      },
    }),
  ).not.toThrow();
});
