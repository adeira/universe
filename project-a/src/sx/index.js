// @flow strict

import murmurHash from '@adeira/murmur-hash';

function transformStyleName(styleName: string): string {
  // TODO: improve (it's naive, but does the job)
  return styleName.replace(/[A-Z]/g, (s) => `-${s.toLowerCase()}`);
}

function transformValue(styleName: string, styleValue: string | number): string | number {
  // TODO:
  //  - simplify #ffffff to #fff
  //  - generate font-sizes using REMs (https://engineering.fb.com/web/facebook-com-accessibility/)
  //  - postcss + autoprefixer (?)
  if (typeof styleValue === 'number') {
    return isUnitlessNumber[styleName] ? styleValue : `${styleValue}px`;
  }
  return styleValue;
}

// Here we are collecting all the styles while doing SSR.
const styleBuffer = new Map<string, string>();

export function renderStatic(renderFunc: () => $FlowFixMe): {| +html: $FlowFixMe, +css: string |} {
  let css = '';
  let prefix = '';
  for (const [key, value] of styleBuffer) {
    css += `${prefix}.${key}{${value}}`;
    prefix = ' ';
  }
  return { html: renderFunc(), css };
}

type StyleSheet = {|
  +[styleName: string]: $FlowFixMe,
|};

type SheetDefinitions = {|
  +[sheetName: string]: StyleSheet,
|};

// https://reactnative.dev/docs/stylesheet
// https://twitter.com/wongmjane/status/1187411809667436550
function sx(styleDefinition: StyleSheet): string {
  /* $FlowExpectedError: This is intentional. We type it so that it looks like we accept the style
   * sheet, however, we are actually getting here the already generated class names. */
  return styleDefinition;
}

// The return type here is actually incorrect (on purpose). Should be `string`.
sx.create = function create(sheetDefinitions: SheetDefinitions): SheetDefinitions {
  const classNames = {};
  for (const [sheetDefinitionName, sheetDefinition] of Object.entries(sheetDefinitions)) {
    const hashes = new Set();
    // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
    for (const [styleName, styleValue] of Object.entries(sheetDefinition)) {
      const style = JSON.stringify({ [styleName]: styleValue }); // TODO: stable stringify
      const hash = murmurHash(style).replace(/^[0-9]/, (s) => `_${s}`); // CSS class cannot start with number
      const transformedStyleName = transformStyleName(styleName);
      styleBuffer.set(
        hash,
        // $FlowIssue[incompatible-call] https://github.com/facebook/flow/issues/5838
        `${transformedStyleName}:${transformValue(transformedStyleName, styleValue)}`,
      );
      hashes.add(hash);
    }
    classNames[sheetDefinitionName] = Array.from(hashes).join(' ');
  }
  return classNames;
};

export default sx;

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
