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
  ['rgb(100%, 0, 60%)', true], // normally, this would be an error (but we are benevolent), TODO: stop being benevolent
  ['hsl(270, 60%, 70)', true], // normally, this would be an error (but we are benevolent), TODO: stop being benevolent
  ['hsl(270, 60, 70%)', true], // normally, this would be an error (but we are benevolent), TODO: stop being benevolent
  ['hsla(270, 60%, 70)', true], // normally, this would be an error (but we are benevolent), TODO: stop being benevolent
  ['hsla(270, 60, 70%)', true], // normally, this would be an error (but we are benevolent), TODO: stop being benevolent
  ['rgb(tada)', false],
  ['rgb(a, b, c)', false],
  ['hsl(a, b, c)', false],
  ['hsla(a, b, c)', false],
  ...validColors.functional.map(([color]) => [color, true]),
])('detects functional (RGBA, HSLA) colors "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
  expect(isColor(color.toUpperCase())).toBe(result);
  expect(isColor(color.replace(/,\s/, ','))).toBe(result);
});
