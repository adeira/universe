// @flow strict

import nullthrows from '../nullthrows';

test.each([null, undefined])('throws for %p', input => {
  expect(() => nullthrows(input)).toThrowErrorMatchingInlineSnapshot(
    `"Got unexpected null or undefined."`,
  );
  expect(() => nullthrows(input, 'Custom error message!')).toThrowErrorMatchingInlineSnapshot(
    `"Custom error message!"`,
  );
});

test.each([false, '', 0, new Date()])('does NOT throw for %p', input => {
  expect(() => nullthrows(input)).not.toThrowError();
  expect(nullthrows(input)).toBe(input);
});
