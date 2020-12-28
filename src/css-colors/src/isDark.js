// @flow strict

import calculateBrightness from './calculateBrightness';

export default function isDark(rgb: [number, number, number]): boolean {
  return calculateBrightness(rgb) < 128;
}
