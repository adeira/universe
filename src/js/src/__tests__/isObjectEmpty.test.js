// @flow strict

import isObjectEmpty from '../isObjectEmpty';

it('is an empty object', () => {
  expect(isObjectEmpty({})).toBe(true);
});

const obj = {};
Object.defineProperty(obj, 'test', {
  enumerable: false,
  value: 'test',
});

test.each([{ a: 1 }, new Date(), '', true, null, undefined, new RegExp(/(?:)/), obj])(
  'is NOT an empty object: %p',
  (input) => {
    expect(isObjectEmpty(input)).toBe(false);
  },
);
