// @flow strict

import isBright from '../isBright';

it('detects bright color correctly', () => {
  expect(isBright([255, 255, 255])).toBe(true); // white
  expect(isBright([0, 0, 0])).toBe(false); // black
  expect(isBright([255, 127, 80])).toBe(true); // coral
  expect(isBright([144, 238, 144])).toBe(true); // lightgreen
  expect(isBright([0, 128, 0])).toBe(false); // green
});
