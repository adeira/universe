// @flow strict

// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
import cssColorNames from './cssColorNames';

export default function isColor(value: string): boolean {
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
    // RGB[A] functional (simplified):
    /^rgba?\(\s*[0-9.]+%?\s*,\s*[0-9.]+%?\s*,\s*[0-9.]+%?\s*(?:,\s*[0-9.]+%?\s*)?\)$/i.test(
      value,
    ) ||
    // HSL[A] functional (simplified):
    /^hsla?\(\s*.+\s*,\s*[0-9.]+%\s*,\s*[0-9.]+%\s*(?:,\s*[0-9.]+%?\s*)?\)$/i.test(value)
  );
}
