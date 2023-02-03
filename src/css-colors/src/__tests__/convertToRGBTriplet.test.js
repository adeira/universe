// @flow strict

import convertToRGBTriplet from '../convertToRGBTriplet';
import { validColors } from './fixtures/validColors';

test.each([
  /* $FlowFixMe[incompatible-call] This comment suppresses an error when
   * upgrading Flow to version 0.199.1. To see the error delete this comment
   * and run Flow. */
  ...validColors.keywords.map(([color, colorTriplet]) => [color, colorTriplet]),
  ...validColors.hexadecimal.map(([color, colorTriplet]) => [color, colorTriplet]),
  ...validColors.functional.map(([color, colorTriplet]) => [color, colorTriplet]),
])('converts %s => %s', (color, colorTriplet) => {
  if (colorTriplet === null) {
    expect(() => convertToRGBTriplet(color)).toThrowErrorMatchingSnapshot();
  } else {
    expect(convertToRGBTriplet(color)).toEqual(colorTriplet);
  }
});
