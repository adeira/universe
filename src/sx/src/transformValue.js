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
  if (typeof styleValue === 'string' && styleValue.startsWith('var(')) {
    // color normalization of CSS variables defaults (https://developer.mozilla.org/en-US/docs/Web/CSS/var())
    const separator = ',';
    const index = styleValue.indexOf(separator);
    if (index === -1) {
      // no default value => early return
      return styleValue;
    }
    const splits = [
      styleValue.slice(
        4, // "var("
        index,
      ),
      styleValue
        .slice(
          index + separator.length,
          -1, // ")"
        )
        .trim(),
    ];
    if (isColor(splits[1])) {
      return `var(${splits[0]},${normalizeColor(splits[1])})`;
    }
    return `var(${splits[0]},${splits[1]})`;
  } else if (typeof styleValue === 'string' && isColor(styleValue)) {
    // color normalization (to reduce duplicates in the atomic result)
    return normalizeColor(styleValue);
  } else if (typeof styleValue === 'number') {
    // 42 -> 42px (unless it's unit-less property like zIndex)
    // $FlowFixMe[invalid-computed-prop] since v0.235.1
    return stripLeadingZero(isUnitlessNumber[styleName] ? `${styleValue}` : `${styleValue}px`);
  }
  return stripLeadingZero(`${styleValue}`);
}
