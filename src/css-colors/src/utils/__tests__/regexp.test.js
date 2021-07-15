// @flow strict

import { _number } from '../regexp';

// https://developer.mozilla.org/en-US/docs/Web/CSS/number
test.each([
  ['0', true],
  ['12', true],
  ['4.01', true],
  ['-456.8', true],
  ['0.0', true],
  ['+0.0', true],
  ['-0.0', true],
  ['.60', true],
  ['10e3', true],
  ['-3.4e-2', true],
  ['-3.4e+2', true],
  ['.60.8', false],
  ['12.', false],
  ['+-12.2', false],
  ['12.1.1', false],
])('is %s a number? (%s)', (number, result) => {
  expect(new RegExp(`^${_number}$`).test(number)).toBe(result);
});
