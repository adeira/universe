// @flow

import transformStyleName from '../transformStyleName';

test.each`
  styleName     | expectedValue
  ${'width'}    | ${'width'}
  ${'height'}   | ${'height'}
  ${'zIndex'}   | ${'z-index'}
  ${'fontSize'} | ${'font-size'}
`('$styleName => $expectedValue', ({ styleName, expectedValue }) => {
  expect(transformStyleName(styleName)).toBe(expectedValue);
});
