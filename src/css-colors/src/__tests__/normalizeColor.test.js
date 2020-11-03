// @flow strict

import { invariant } from '@adeira/js';

import isColor from '../isColor';
import normalizeColor from '../normalizeColor';

test.each`
  color                          | result
  ${'red'}                       | ${'#f00'}
  ${'lime'}                      | ${'#0f0'}
  ${'blue'}                      | ${'#00f'}
  ${'#F00'}                      | ${'#f00'}
  ${'#0F0'}                      | ${'#0f0'}
  ${'#00F'}                      | ${'#00f'}
  ${'#ff0000'}                   | ${'#f00'}
  ${'#00ff00'}                   | ${'#0f0'}
  ${'#0000ff'}                   | ${'#00f'}
  ${'#663399'}                   | ${'#639'}
  ${'rebeccapurple'}             | ${'#639'}
  ${'rgb(255, 255, 128)'}        | ${'rgb(255, 255, 128)'}
  ${'hsl( 50  ,  33%  ,  25% )'} | ${'hsl( 50  ,  33%  ,  25% )'}
`('normalizes color "$color" correctly ($result)', ({ color, result }) => {
  invariant(isColor(color), '"%s" is not a color', color);
  expect(normalizeColor(color)).toBe(result);
});

test.each`
  notColor              | result
  ${'#0'}               | ${'#0'}
  ${'#00'}              | ${'#00'}
  ${'#00000'}           | ${'#00000'}
  ${'#0000000'}         | ${'#0000000'}
  ${'yaDAda'}           | ${'yadada'}
  ${'#acegik'}          | ${'#acegik'}
  ${'rgb(a, b, c)'}     | ${'rgb(a, b, c)'}
  ${'hsl(50, 33, 25%)'} | ${'hsl(50, 33, 25%)'}
`('normalizes unknown color "$notColor" gracefully', ({ notColor, result }) => {
  expect(isColor(notColor)).toBe(false);
  expect(normalizeColor(notColor)).toBe(result);
});
