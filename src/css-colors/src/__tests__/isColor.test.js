// @flow strict

import isColor from '../isColor';
import { validColors } from './fixtures/validColors';

// See: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Examples
test.each([
  [1, false],
  [true, false],
  ['unknown', false],
  ...validColors.keywords.map(([color]) => [color, true]),
])('detects keyword colors "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
});

test.each([
  ['#aa', false],
  ['#xxxxxx', false],
  ...validColors.hexadecimal.map(([color]) => [color, true]),
])('detects hexadecimal colors "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
});

test.each([
  // Invalid cases for RGB(A):
  ['rgb(tada)', false],
  ['rgb(a, b, c)', false], // non numbers
  ['rgb(100%, 0, 60%)', false], // cannot mix numbers and percentages
  ['rgba(100%, 0, 60%)', false], // ditto
  ['rgb(1 1 1 1)', false], // should be `rgb(1,1,1,1)` or `rgb(1 1 1 / 1)`
  ['rgba(1 1 1 1)', false], // ditto
  ['rgb(1, 1, 1 / 1)', false], // should be `rgb(1,1,1,1)` or `rgb(1 1 1 / 1)`
  ['rgba(1, 1, 1 / 1)', false], // ditto

  // Invalid cases for HSL(A):
  ['hsl(270, 60%, 70)', false], // HSL should have only percentages
  ['hsla(270, 60%, 70)', false], // ditto
  ['hsl(270, 60, 70%)', false], // ditto
  ['hsla(270, 60, 70%)', false], // ditto
  ['hsl(270, 50%, 50% / 25%)', false], // should be `hsl(270, 50%, 50%, 25%)`
  ['hsl(270 50% 50%, 25%)', false], // should be `hsl(270 50% 50% / 25%)`
  ['hsl(a, b, c)', false],
  ['hsla(a, b, c)', false],

  // All other valid cases:
  ...validColors.functional.map(([color]) => [color, true]),
])('detects functional (RGBA, HSLA) colors "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
  expect(isColor(color.toUpperCase())).toBe(result);
  expect(isColor(color.replace(/,\s/, ','))).toBe(result);
});
