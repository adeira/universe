// @flow

import create from './src/create';
import styleBuffer from './src/styleBuffer';

// TODO: export below with other functions (?)
export function renderStatic(renderFunc: () => $FlowFixMe): {| +html: $FlowFixMe, +css: string |} {
  let css = '';
  let prefix = '';
  for (const [key, value] of styleBuffer) {
    css += `${prefix}.${key}{${value.styleName}:${value.styleValue}}`;
    prefix = ' ';
  }
  return { html: renderFunc(), css };
}

export default {
  create,
};
