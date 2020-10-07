// @flow strict

import { invariant } from '@adeira/js';

import { normalizeColor, isColor } from '../colorNormalizer';

test.each`
  color          | result
  ${1}           | ${false}
  ${true}        | ${false}
  ${'blue'}      | ${true}
  ${'aliceblue'} | ${true}
  ${'#fff'}      | ${true}
  ${'#ffffff'}   | ${true}
  ${'#000000'}   | ${true}
  ${'#xxxxxx'}   | ${false}
  ${'#0000'}     | ${false}
`('detects color "$color" correctly ($result)', ({ color, result }) => {
  expect(isColor(color)).toBe(result);
});

test.each`
  color        | result
  ${'red'}     | ${'#f00'}
  ${'lime'}    | ${'#0f0'}
  ${'blue'}    | ${'#00f'}
  ${'#F00'}    | ${'#f00'}
  ${'#0F0'}    | ${'#0f0'}
  ${'#00F'}    | ${'#00f'}
  ${'#ff0000'} | ${'#f00'}
  ${'#00ff00'} | ${'#0f0'}
  ${'#0000ff'} | ${'#00f'}
`('normalizes color "$color" correctly ($result)', ({ color, result }) => {
  invariant(isColor(color), '"%s" is not a color', color);
  expect(normalizeColor(color)).toBe(result);
});

test.each`
  notColor      | result
  ${'#0'}       | ${'#0'}
  ${'#00'}      | ${'#00'}
  ${'#0000'}    | ${'#0000'}
  ${'#00000'}   | ${'#00000'}
  ${'#0000000'} | ${'#0000000'}
  ${'yaDAda'}   | ${'yadada'}
  ${'#acegik'}  | ${'#acegik'}
`('normalizes unknown color "$notColor" gracefully', ({ notColor, result }) => {
  expect(isColor(notColor)).toBe(false);
  expect(normalizeColor(notColor)).toBe(result);
});
