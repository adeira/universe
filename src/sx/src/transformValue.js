// @flow strict

import { isColor, normalizeColor } from '@adeira/css-colors';

import isUnitlessNumber from './css-properties/isUnitlessNumber';

function stripLeadingZero(value: string): string {
  return value.replace(/^0(?<val>\..+)/, '$1');
}

export default function transformValue(
  styleName: string,
  styleValue?: string | number = '',
): string {
  if (typeof styleValue === 'string' && isColor(styleValue)) {
    // color normalization (to reduce duplicates in the atomic result)
    return normalizeColor(styleValue);
  } else if (typeof styleValue === 'number') {
    // 42 -> 42px (unless it's unit-less property like zIndex)
    return stripLeadingZero(isUnitlessNumber[styleName] ? `${styleValue}` : `${styleValue}px`);
  }
  return stripLeadingZero(`${styleValue}`);
}
