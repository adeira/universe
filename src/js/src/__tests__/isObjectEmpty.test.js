// @flow strict

import isObjectEmpty from '../isObjectEmpty';

it('is an empty object', () => {
  expect(isObjectEmpty({})).toBe(true);
});

test.each([{ a: 1 }, new Date(), '', true, null, undefined, new RegExp(/(?:)/)])(
  'is NOT an empty object: %p',
  input => {
    expect(isObjectEmpty(input)).toBe(false);
  },
);
