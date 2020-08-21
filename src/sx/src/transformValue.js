// @flow strict

const isUnitlessNumber = require('./css-properties/isUnitlessNumber');

// https://engineering.fb.com/web/facebook-com-accessibility/
export default function transformValue(
  styleName: string,
  styleValue?: string | number = '',
): string {
  // TODO:
  //  - simplify #ffffff to #fff
  //  - postcss + autoprefixer (?)
  if (styleName === 'fontSize') {
    const defaultFontSize = 16; // we expect `font-size: 16px;` to be set by default
    return `${Number(styleValue) / defaultFontSize}rem`;
  }
  if (typeof styleValue === 'number') {
    return isUnitlessNumber[styleName] ? `${styleValue}` : `${styleValue}px`;
  }
  return `${styleValue}`;
}
