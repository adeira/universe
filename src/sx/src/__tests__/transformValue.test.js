// @flow strict

import transformValue from '../transformValue';

test.each`
  styleName     | styleValue          | expectedValue
  ${'border'}   | ${'1px solid #Ab3'} | ${'1px solid #Ab3'}
  ${'width'}    | ${150}              | ${'150px'}
  ${'height'}   | ${150}              | ${'150px'}
  ${'zIndex'}   | ${10}               | ${'10'}
  ${'fontSize'} | ${8}                | ${'0.5rem'}
  ${'fontSize'} | ${16}               | ${'1rem'}
  ${'fontSize'} | ${24}               | ${'1.5rem'}
  ${'fontSize'} | ${32}               | ${'2rem'}
  ${'color'}    | ${'#123456'}        | ${'#123456'}
  ${'color'}    | ${'#123ABC'}        | ${'#123abc'}
  ${'color'}    | ${'#ffffff'}        | ${'#fff'}
  ${'color'}    | ${'#fffff0'}        | ${'#fffff0'}
  ${'color'}    | ${'#ABCDEF'}        | ${'#abcdef'}
  ${'content'}  | ${'🦕'}             | ${'"🦕"'}
`(
  '$styleName:$styleValue => $styleName:$expectedValue',
  ({ styleName, styleValue, expectedValue }) => {
    expect(transformValue(styleName, styleValue)).toBe(expectedValue);
  },
);
