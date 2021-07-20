// @flow strict

import calculateContrastRatio from './calculateContrastRatio';

/**
 * This function takes 2 possible foreground colors and returns the one which would create larger
 * contrast against the specified background. It can be used when you are deciding about the best
 * color for accessibility purposes (the one with higher contrast is better).
 */
export default function chooseHigherContrast(
  rgbForegroundA: [number, number, number],
  rgbForegroundB: [number, number, number],
  rgbBackground: [number, number, number],
): [number, number, number] {
  const foregroundAContrastRatio = calculateContrastRatio(rgbForegroundA, rgbBackground);
  const foregroundBContrastRatio = calculateContrastRatio(rgbForegroundB, rgbBackground);

  return foregroundAContrastRatio >= foregroundBContrastRatio ? rgbForegroundA : rgbForegroundB;
}
