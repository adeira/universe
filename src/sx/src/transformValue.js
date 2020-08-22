// @flow strict

const isUnitlessNumber = require('./css-properties/isUnitlessNumber');

export default function transformValue(
  styleName: string,
  styleValue?: string | number = '',
): string {
  if (styleName === 'fontSize') {
    // px -> rem (we expect `font-size: 16px;` to be set by default)
    // https://engineering.fb.com/web/facebook-com-accessibility/
    const defaultFontSize = 16;
    return `${Number(styleValue) / defaultFontSize}rem`;
  } else if (styleName === 'content') {
    // content style is the only one (?) which requires quoted value
    return `"${styleValue}"`;
  } else if (typeof styleValue === 'string' && /^#[0-9a-f]{3,6}$/i.test(styleValue)) {
    // color normalization (to reduce duplicates in the atomic result)
    return styleValue
      .toLowerCase() //
      .replace(/^#(?<char>[0-9a-f])\1{5}$/, (m) => m.substring(0, 4)); // #ffffff -> #fff
  } else if (typeof styleValue === 'number') {
    // 42 -> 42px (unless it's unit-less property like zIndex)
    return isUnitlessNumber[styleName] ? `${styleValue}` : `${styleValue}px`;
  }

  return `${styleValue}`;
}
