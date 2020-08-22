// @flow

import { styleBuffer, mediaStyleBuffer } from './styleBuffer';

function printBuffer(buffer) {
  let css = '';
  let prefix = '';
  for (const [key, value] of buffer) {
    css += `${prefix}.${key}${value.pseudo ?? ''}{${value.styleName}:${value.styleValue}}`;
    prefix = ' ';
  }
  return css;
}

export default function renderStatic(
  renderFunc: () => $FlowFixMe,
): {| +html: $FlowFixMe, +css: string |} {
  let css = printBuffer(styleBuffer);
  let prefix = '';

  for (const [key, value] of mediaStyleBuffer) {
    css += `${prefix}${key}{${printBuffer(value)}}`;
    prefix = ' ';
  }

  return {
    html: renderFunc(),
    css,
  };
}
