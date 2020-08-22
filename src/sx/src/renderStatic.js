// @flow

import styleBuffer from './styleBuffer';

export default function renderStatic(
  renderFunc: () => $FlowFixMe,
): {| +html: $FlowFixMe, +css: string |} {
  let css = '';
  let prefix = '';
  for (const [key, value] of styleBuffer) {
    css += `${prefix}.${key}${value.pseudo ?? ''}{${value.styleName}:${value.styleValue}}`;
    prefix = ' ';
  }
  return { html: renderFunc(), css };
}
