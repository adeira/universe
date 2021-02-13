// @flow strict

import rangeMap from '../rangeMap';

it.each([
  [-2, []],
  [-1, []],
  [0, []],
  [1, ['0']],
  [2, ['0', '1']],
])('works as expected (%s -> %s)', (input, output) => {
  expect(rangeMap(input, (i) => String(i))).toEqual(output);
});
