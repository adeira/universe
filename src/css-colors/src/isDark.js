// @flow strict

import calculateBrightness from './calculateBrightness';

/**
 * @deprecated It's a bit funky to take into account only one color and decide whether it's bright
 * or not. While one color might be bright, it doesn't say much about colors accessibility and it
 * doesn't allow to compare text vs. background colors for example. These two calls are basically
 * equivalent:
 *
 * ```js
 * isDark(rgb);
 *
 * isAccessible(rgb, [255, 255, 255]); // comparing with white background
 * ```
 */
export default function isDark(rgb: [number, number, number]): boolean {
  return calculateBrightness(rgb) < 128;
}
