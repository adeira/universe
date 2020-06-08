// @flow strict

import { isObject } from '../index';

test.each([
  {},
  new Object(), // eslint-disable-line no-new-object
  { aaa: 111 },
  new Date(),
  new Map(),
  new RegExp(/a/),
])('value %p is an object', value => {
  expect(isObject(value)).toBe(true);
});

test.each([null, [], -1, 'err', function _void() {}, Symbol('ok'), NaN, undefined])(
  'value %p is NOT an object',
  value => {
    expect(isObject(value)).toBe(false);
  },
);
