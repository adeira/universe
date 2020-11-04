// @flow strict

import isColor, { _number } from '../isColor';

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

// See: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Examples
test.each([
  [1, false],
  [true, false],
  ['unknown', false],
  ['blue', true],
  ['aliceblue', true],
  ['transparent', true],
  ['currentcolor', true],
])('detects keyword color "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
});

test.each([
  ['#f09', true],
  ['#F09', true],
  ['#ff0099', true],
  ['#FF0099', true],
  ['#f09f', true],
  ['#F09F', true],
  ['#ff0099ff', true],
  ['#FF0099FF', true],
  ['#xxxxxx', false],
])('detects hexadecimal color "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
});

test.each([
  ['rgb(255, 0, 153)', true],
  ['rgb(255, 0, 153.0)', true],
  ['rgb(100%, 0%, 60%)', true],
  ['rgb(100%, 0, 60%)', true], // normally, this would be an error (but we are benevolent)
  ['rgb(255 0 153)', true],
  ['rgb(255, 0, 153, 1)', true],
  ['rgb(255, 0, 153, 100%)', true],
  ['rgb(255 0 153/1)', true],
  ['rgb(255 0 153 / 1)', true],
  ['rgb(255 0 153 / 100%)', true],
  ['rgb(255, 0, 153.6, 1)', true],
  ['rgb(1e2, .5e1, .5e0, +.25e2%)', true],
  ['rgb(tada)', false],
  ['rgb(a, b, c)', false],
])('detects RGB color "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
  expect(isColor(color.toUpperCase())).toBe(result);
  expect(isColor(color.replace(/,\s/, ','))).toBe(result);
});

test.each([
  ['rgba(51, 170, 51, .1)', true],
  ['rgba(51, 170, 51, .4)', true],
  ['rgba(51, 170, 51, .7)', true],
  ['rgba(51, 170, 51, 1)', true],
  ['rgba(51 170 51 / 0.4)', true],
  ['rgba(51 170 51 / 40%)', true],
  ['rgba(255, 0, 153.6, 1)', true],
  ['rgba(1e2, .5e1, .5e0, +.25e2%)', true],
  ['rgba(tada)', false],
  ['rgba(a, b, c)', false],
])('detects RGBA color "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
  expect(isColor(color.toUpperCase())).toBe(result);
  expect(isColor(color.replace(/,\s/, ','))).toBe(result);
});

test.each([
  ['hsl(270, 60%, 70%)', true],
  ['hsl(270 60% 70%)', true],
  ['hsl(270deg, 60%, 70%)', true],
  ['hsl(4.71239rad, 60%, 70%)', true],
  ['hsl(.75turn, 60%, 70%)', true],
  ['hsl(270, 60%, 50%, .15)', true],
  ['hsl(270, 60%, 50%, 15%)', true],
  ['hsl(270 60% 50%/.15)', true],
  ['hsl(270 60% 50% / .15)', true],
  ['hsl(270 60% 50% / 15%)', true],
  ['hsl(270, 60%, 70)', true], // normally, this would be an error (but we are benevolent)
  ['hsl(270, 60, 70%)', true], // normally, this would be an error (but we are benevolent)
  ['hsl(a, b, c)', false],
])('detects HSL color "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
  expect(isColor(color.toUpperCase())).toBe(result);
  expect(isColor(color.replace(/,\s/, ','))).toBe(result);
});

test.each([
  ['hsla(270, 60%, 70%)', true],
  ['hsla(270 60% 70%)', true],
  ['hsla(270deg, 60%, 70%)', true],
  ['hsla(4.71239rad, 60%, 70%)', true],
  ['hsla(.75turn, 60%, 70%)', true],
  ['hsla(270, 60%, 50%, .15)', true],
  ['hsla(270, 60%, 50%, 15%)', true],
  ['hsla(270 60% 50% / .15)', true],
  ['hsla(270 60% 50% / 15%)', true],
  ['hsla(270, 60%, 70)', true], // normally, this would be an error (but we are benevolent)
  ['hsla(270, 60, 70%)', true], // normally, this would be an error (but we are benevolent)
  ['hsla(a, b, c)', false],
])('detects HSLA color "%s" correctly (%s)', (color, result) => {
  expect(isColor(color)).toBe(result);
  expect(isColor(color.toUpperCase())).toBe(result);
  expect(isColor(color.replace(/,\s/, ','))).toBe(result);
});
