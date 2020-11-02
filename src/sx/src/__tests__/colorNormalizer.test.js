// @flow strict

import { invariant } from '@adeira/js';

import { normalizeColor, isColor } from '../colorNormalizer';

test.each`
  color                           | result
  ${1}                            | ${false}
  ${true}                         | ${false}
  ${'blue'}                       | ${true}
  ${'aliceblue'}                  | ${true}
  ${'#fff'}                       | ${true}
  ${'#ffffff'}                    | ${true}
  ${'#000000'}                    | ${true}
  ${'#xxxxxx'}                    | ${false}
  ${'#1fe0'}                      | ${true}
  ${'#1fef'}                      | ${true}
  ${'#11ffee00'}                  | ${true}
  ${'#11ffeeff'}                  | ${true}
  ${'transparent'}                | ${true}
  ${'currentcolor'}               | ${true}
  ${'rgb(255,255,128)'}           | ${true}
  ${'RGB(255,255,128)'}           | ${true}
  ${'rgb(255, 255, 128)'}         | ${true}
  ${'rgba(255, 255, 128)'}        | ${true}
  ${'rgb(100%, 50, 50%)'}         | ${true}
  ${'rgb(100%,0%,60%)'}           | ${true}
  ${'rgb( 255  ,  255  ,  128 )'} | ${true}
  ${'rgba(117, 190, 218, 0.5)'}   | ${true}
  ${'rgb(117 , 190 , 218 , 0.5)'} | ${true}
  ${'rgb(tada)'}                  | ${false}
  ${'rgb(a, b, c)'}               | ${false}
  ${'hsl(50, 33%, 25%)'}          | ${true}
  ${'HSL(50, 33%, 25%)'}          | ${true}
  ${'hsl( 50  ,  33%  ,  25% )'}  | ${true}
  ${'hsla(50, 33%, 25%, 0.75)'}   | ${true}
  ${'hsl(50, 33, 25%)'}           | ${false}
  ${'hsl(50, 33%, 25)'}           | ${false}
  ${'hsl(45deg, 33%, 25%)'}       | ${true}
`('detects color "$color" correctly ($result)', ({ color, result }) => {
  expect(isColor(color)).toBe(result);
});

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
