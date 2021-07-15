// @flow strict

import cssColorNames from './cssColorNames';
import isHSLA from './utils/isHSLA';
import isRGBA from './utils/isRGBA';

/**
 * Detects whether the specified values is a CSS/HTML valid color. It currently supports:
 *  - color keywords
 *  - RGB (#-hexadecimal, rgb(…), rgba(…))
 *  - HSL (hsl(…) and hsla(…))
 *
 * TODO (currently not suported):
 *  - lch(…) - https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch()
 *  - lab(…) - https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab()
 *  - color(…) - https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color()
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
 */
export default function isColor(value: string | number): boolean {
  if (typeof value !== 'string') {
    return false;
  }

  return (
    value === 'transparent' ||
    value === 'currentcolor' ||
    cssColorNames.has(value) || // keyword values
    /^#[0-9a-f]{3}$/i.test(value) || // RGB hexadecimal shorthand
    /^#[0-9a-f]{4}$/i.test(value) || // RGB hexadecimal shorthand (with alpha)
    /^#[0-9a-f]{6}$/i.test(value) || // RGB hexadecimal full
    /^#[0-9a-f]{8}$/i.test(value) || // RGB hexadecimal full (with alpha)
    isRGBA(value) || // RGB[A] functional
    isHSLA(value) // HSL[A] functional
  );
}
