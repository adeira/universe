// @flow strict

import transformValue from '../transformValue';

test.each`
  styleName     | styleValue                   | expectedValue
  ${'border'}   | ${'1px solid #Ab3'}          | ${'1px solid #Ab3'}
  ${'width'}    | ${150}                       | ${'150px'}
  ${'height'}   | ${150}                       | ${'150px'}
  ${'zIndex'}   | ${10}                        | ${'10'}
  ${'zIndex'}   | ${'auto'}                    | ${'auto'}
  ${'fontSize'} | ${8}                         | ${'8px'}
  ${'fontSize'} | ${16}                        | ${'16px'}
  ${'fontSize'} | ${24}                        | ${'24px'}
  ${'fontSize'} | ${32}                        | ${'32px'}
  ${'fontSize'} | ${'1.25rem'}                 | ${'1.25rem'}
  ${'fontSize'} | ${'small'}                   | ${'small'}
  ${'color'}    | ${'#123456'}                 | ${'#123456'}
  ${'color'}    | ${'#123ABC'}                 | ${'#123abc'}
  ${'color'}    | ${'#ffffff'}                 | ${'#fff'}
  ${'color'}    | ${'#fffff0'}                 | ${'#fffff0'}
  ${'color'}    | ${'#ABCDEF'}                 | ${'#abcdef'}
  ${'color'}    | ${'white'}                   | ${'#fff'}
  ${'color'}    | ${'aqua'}                    | ${'#0ff'}
  ${'color'}    | ${'chocolate'}               | ${'#d2691e'}
  ${'content'}  | ${'"🦕"'}                    | ${'"🦕"'}
  ${'color'}    | ${'var(--color)'}            | ${'var(--color)'}
  ${'color'}    | ${'var(--color,red)'}        | ${'var(--color,#f00)'}
  ${'color'}    | ${'var(--color, red)'}       | ${'var(--color,#f00)'}
  ${'color'}    | ${'var(--color, red, blue)'} | ${'var(--color,red, blue)'}
`(
  '$styleName:$styleValue => $styleName:$expectedValue',
  ({ styleName, styleValue, expectedValue }) => {
    expect(transformValue(styleName, styleValue)).toBe(expectedValue);
  },
);

test.each`
  rawValue     | normalizedValue
  ${'0.1'}     | ${'.1'}
  ${'1.1'}     | ${'1.1'}
  ${'0.75rem'} | ${'.75rem'}
  ${'.75rem'}  | ${'.75rem'}
  ${'75rem'}   | ${'75rem'}
  ${'4px'}     | ${'4px'}
  ${'.4px'}    | ${'.4px'}
  ${'0.4px'}   | ${'.4px'}
  ${'0px'}     | ${'0px'}
  ${0}         | ${'0px'}
  ${10}        | ${'10px'}
  ${0.1}       | ${'.1px'}
`('transforms $rawValue into $normalizedValue', ({ rawValue, normalizedValue }) => {
  expect(transformValue('any', rawValue)).toBe(normalizedValue);
});
