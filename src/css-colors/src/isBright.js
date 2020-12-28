// @flow strict

import calculateBrightness from './calculateBrightness';

export default function isBright(rgb: [number, number, number]): boolean {
  return calculateBrightness(rgb) >= 128;
}
