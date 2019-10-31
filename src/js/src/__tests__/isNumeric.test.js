// @flow strict

import { isNumeric } from '../index';

/* eslint-disable no-new-wrappers, no-new-object */

test.each([
  '-10', // negative integer string
  '0', // zero string
  '5', // positive integer string
  -16, // negative integer number
  0, // zero number
  32, // positive integer number
  '040', // octal integer literal string
  // 0144, // octal integer literal
  '0xFF', // hexadecimal integer literal string
  0xfff, // hexadecimal integer literal
  '-1.6', // negative floating point string
  '4.536', // positive floating point string
  -2.6, // negative floating point number
  3.1415, // positive floating point number
  8e5, // exponential notation
  '123e-2', // exponential notation string
  new Number(42),
])('value %p is a number', value => {
  expect(isNumeric(value)).toBe(true);
});

test.each([
  '', // empty string
  '        ', // whitespace characters string
  '\t\t', // tab characters string
  'abcdefghijklm1234567890', // alphanumeric character string
  'xabcdefx', // non-numeric character string
  true,
  false,
  'bcfed5.2', // number with preceding non-numeric characters
  '7.2acdgs', // number with trailling non-numeric characters
  undefined,
  null,
  NaN,
  Infinity,
  Number.POSITIVE_INFINITY,
  Number.NEGATIVE_INFINITY,
  new Date(2009, 1, 1),
  new Object(),
  function() {},
  [],
])('value %p is NOT a number', value => {
  expect(isNumeric(value)).toBe(false);
});
