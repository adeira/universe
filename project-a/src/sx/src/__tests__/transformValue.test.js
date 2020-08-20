// @flow strict

import transformValue from '../transformValue';

test.each`
  styleName     | styleValue | expectedValue
  ${'width'}    | ${150}     | ${'150px'}
  ${'height'}   | ${150}     | ${'150px'}
  ${'zIndex'}   | ${10}      | ${'10'}
  ${'fontSize'} | ${8}       | ${'0.5rem'}
  ${'fontSize'} | ${16}      | ${'1rem'}
  ${'fontSize'} | ${24}      | ${'1.5rem'}
  ${'fontSize'} | ${32}      | ${'2rem'}
`(
  '$styleName:$styleValue => $styleName:$expectedValue',
  ({ styleName, styleValue, expectedValue }) => {
    expect(transformValue(styleName, styleValue)).toBe(expectedValue);
  },
);
