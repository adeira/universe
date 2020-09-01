// @flow strict

import transformValue from '../transformValue';

test.each`
  styleName     | styleValue          | expectedValue
  ${'border'}   | ${'1px solid #Ab3'} | ${'1px solid #Ab3'}
  ${'width'}    | ${150}              | ${'150px'}
  ${'height'}   | ${150}              | ${'150px'}
  ${'zIndex'}   | ${10}               | ${'10'}
  ${'zIndex'}   | ${'auto'}           | ${'auto'}
  ${'fontSize'} | ${8}                | ${'0.5rem'}
  ${'fontSize'} | ${16}               | ${'1rem'}
  ${'fontSize'} | ${24}               | ${'1.5rem'}
  ${'fontSize'} | ${32}               | ${'2rem'}
  ${'fontSize'} | ${'1.25rem'}        | ${'1.25rem'}
  ${'fontSize'} | ${'small'}          | ${'small'}
  ${'color'}    | ${'#123456'}        | ${'#123456'}
  ${'color'}    | ${'#123ABC'}        | ${'#123abc'}
  ${'color'}    | ${'#ffffff'}        | ${'#fff'}
  ${'color'}    | ${'#fffff0'}        | ${'#fffff0'}
  ${'color'}    | ${'#ABCDEF'}        | ${'#abcdef'}
  ${'color'}    | ${'white'}          | ${'#fff'}
  ${'color'}    | ${'aqua'}           | ${'#0ff'}
  ${'color'}    | ${'chocolate'}      | ${'#d2691e'}
  ${'content'}  | ${'🦕'}             | ${'"🦕"'}
`(
  '$styleName:$styleValue => $styleName:$expectedValue',
  ({ styleName, styleValue, expectedValue }) => {
    expect(transformValue(styleName, styleValue)).toBe(expectedValue);
  },
);
