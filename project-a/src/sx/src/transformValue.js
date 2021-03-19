// @flow strict

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

/**
 * CSS properties which accept numbers but are not in units of "px".
 * https://github.com/facebook/react/blob/87b3e2d257e49b6d2c8e662830fc8f3c7d62f85f/packages/react-dom/src/shared/CSSProperty.js
 */
export const isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true,
};
