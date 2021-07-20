// @flow strict

import { sprintf } from '@adeira/js';

import cssColorNames from './cssColorNames';
import hex3ToHex6 from './hex3ToHex6';
import isColor from './isColor';
import { RGBA_PATTERN_MATCH } from './utils/isRGBA';

const HEX_REGEXP_SHORT = /^#(?<R>[a-f0-9])(?<G>[a-f0-9])(?<B>[a-f0-9])$/i;
const HEX_REGEXP_LONG = /^#(?<R>[a-f0-9]{2})(?<G>[a-f0-9]{2})(?<B>[a-f0-9]{2})$/i;

/**
 * Tries to convert the input value into RGB triplet which is commonly used throughout this library
 * for further calculations (brightness, accessibility, …). The input value can be anything that is
 * valid in CSS/HTML.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
 *
 * It throws an error when the conversion is not implemented yet.
 *
 * TODO: How to deal with alpha channel (not supported in the triplet). Should we introduce custom
 *  object to keep all the extracted values?
 */
export default function convertToRGBTriplet(value: string): [number, number, number] {
  if (isColor(value)) {
    const rgbaColorMatch = value.match(RGBA_PATTERN_MATCH);
    if (cssColorNames.has(value)) {
      const hexColor = cssColorNames.get(value);
      // $FlowIssue[incompatible-call]: `hexColor` should not be undefined after calling `has` above
      return convertHexToRGBTriplet(hexColor);
    } else if (HEX_REGEXP_LONG.test(value)) {
      return convertHexToRGBTriplet(value);
    } else if (HEX_REGEXP_SHORT.test(value)) {
      return convertHexToRGBTriplet(hex3ToHex6(value));
    } else if (rgbaColorMatch) {
      return convertRGBToTriplet(
        rgbaColorMatch.groups?.R,
        rgbaColorMatch.groups?.G,
        rgbaColorMatch.groups?.B,
      );
    }
    throw new Error(sprintf('Conversion of color "%s" is currently not supported.', value));
  } else {
    throw new Error(sprintf('Value "%s" is not a color!', value));
  }
}

function convertHexToRGBTriplet(hexColor: string): [number, number, number] {
  // TODO: we currently ignore alpha channels of the #RGB colors (#RGBA)
  const hexColorMatch = hexColor.match(HEX_REGEXP_LONG);
  return [
    parseInt(hexColorMatch?.groups?.R, 16),
    parseInt(hexColorMatch?.groups?.G, 16),
    parseInt(hexColorMatch?.groups?.B, 16),
  ];
}

function convertRGBToTriplet(r, g, b): [number, number, number] {
  return [
    Number(r?.endsWith('%') ? convertPercentageToNumber(r) : r),
    Number(g?.endsWith('%') ? convertPercentageToNumber(g) : g),
    Number(b?.endsWith('%') ? convertPercentageToNumber(b) : b),
  ];
}

function convertPercentageToNumber(percentage) {
  const match = percentage?.match(/^(?<number>\d+)%$/)?.groups;
  return Math.round((255 / 100) * Number(match?.number));
}
