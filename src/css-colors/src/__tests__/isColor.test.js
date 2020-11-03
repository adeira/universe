// @flow strict

import isColor from '../isColor';

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
