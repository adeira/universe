// @flow strict

import calculateBrightness from '../calculateBrightness';

// See: https://github.com/chromium/chromium/blob/15aa6bb80864a6dd89c25313dfd2839c6055724e/third_party/google-closure-library/closure/goog/color/color_test.js#L542
it('calculates brightness correctly', () => {
  expect(calculateBrightness([255, 255, 255])).toBe(255); // white
  expect(calculateBrightness([0, 0, 0])).toBe(0); // black
  expect(calculateBrightness([255, 127, 80])).toBe(160); // coral
  expect(calculateBrightness([144, 238, 144])).toBe(199); // lightgreen
  expect(calculateBrightness([0, 128, 0])).toBe(75); // green
});
