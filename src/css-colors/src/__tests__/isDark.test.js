// @flow strict

import isDark from '../isDark';

it('detects dark color correctly', () => {
  expect(isDark([255, 255, 255])).toBe(false); // white
  expect(isDark([0, 0, 0])).toBe(true); // black
  expect(isDark([255, 127, 80])).toBe(false); // coral
  expect(isDark([144, 238, 144])).toBe(false); // lightgreen
  expect(isDark([0, 128, 0])).toBe(true); // green
});
