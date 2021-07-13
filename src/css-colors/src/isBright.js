// @flow strict

import calculateBrightness from './calculateBrightness';

/**
 * @deprecated It's a bit funky to take into account only one color and decide whether it's bright
 * or not. While one color might be bright, it doesn't say much about colors accessibility and it
 * doesn't allow to compare text vs. background colors for example. These two calls are basically
 * equivalent:
 *
 * ```js
 * isBright(rgb);
 *
 * isAccessible(rgb, [0, 0, 0]); // comparing with black background
 * ```
 */
export default function isBright(rgb: [number, number, number]): boolean {
  return calculateBrightness(rgb) >= 128;
}
