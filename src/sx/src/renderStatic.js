// @flow

import styleBuffer from './styleBuffer';

function valueRequiresQuotes(styleName: string): boolean {
  // TODO: some style values like `content` require quotes
  return styleName === 'content';
}

export default function renderStatic(
  renderFunc: () => $FlowFixMe,
): {| +html: $FlowFixMe, +css: string |} {
  let css = '';
  let prefix = '';
  for (const [key, value] of styleBuffer) {
    const styleValue = valueRequiresQuotes(value.styleName)
      ? `"${value.styleValue}"`
      : value.styleValue;

    css += `${prefix}.${key}${value.pseudo ?? ''}{${value.styleName}:${styleValue}}`;
    prefix = ' ';
  }
  return { html: renderFunc(), css };
}
