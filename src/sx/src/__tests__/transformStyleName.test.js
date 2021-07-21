// @flow

import transformStyleName from '../transformStyleName';

test.each`
  styleName               | expectedValue
  ${'width'}              | ${'width'}
  ${'height'}             | ${'height'}
  ${'zIndex'}             | ${'z-index'}
  ${'fontSize'}           | ${'font-size'}
  ${'webkitLineClamp'}    | ${'-webkit-line-clamp'}
  ${'--transform-skew-y'} | ${'--transform-skew-y'}
`('$styleName => $expectedValue', ({ styleName, expectedValue }) => {
  expect(transformStyleName(styleName)).toBe(expectedValue);
});
