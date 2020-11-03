// @flow strict

import { isColor, normalizeColor } from '@adeira/css-colors';

import isUnitlessNumber from './css-properties/isUnitlessNumber';

export default function transformValue(
  styleName: string,
  styleValue?: string | number = '',
): string {
  if (styleName === 'fontSize' && typeof styleValue === 'number') {
    // px -> rem (we expect `font-size: 16px;` to be set by default)
    // https://engineering.fb.com/web/facebook-com-accessibility/
    const defaultFontSize = 16;
    return `${Number(styleValue) / defaultFontSize}rem`;
  } else if (typeof styleValue === 'string' && isColor(styleValue)) {
    // color normalization (to reduce duplicates in the atomic result)
    return normalizeColor(styleValue);
  } else if (typeof styleValue === 'number') {
    // 42 -> 42px (unless it's unit-less property like zIndex)
    return isUnitlessNumber[styleName] ? `${styleValue}` : `${styleValue}px`;
  }

  return `${styleValue}`;
}
