// @flow

import create from './src/create';
import styleBuffer from './src/styleBuffer';

export function renderStatic(renderFunc: () => $FlowFixMe): {| +html: $FlowFixMe, +css: string |} {
  let css = '';
  let prefix = '';
  for (const [key, value] of styleBuffer) {
    css += `${prefix}.${key}{${value}}`;
    prefix = ' ';
  }
  return { html: renderFunc(), css };
}

export default {
  create,
};
