// @flow

import create from './src/create';
import styleBuffer from './src/styleBuffer';
import type { AllCSSPropertyTypes } from './src/css-properties/__generated__/AllCSSPropertyTypes';

// TODO: export below with other functions (?)
export function renderStatic(renderFunc: () => $FlowFixMe): {| +html: $FlowFixMe, +css: string |} {
  let css = '';
  let prefix = '';
  for (const [key, value] of styleBuffer) {
    css += `${prefix}.${key}{${value}}`;
    prefix = ' ';
  }
  return { html: renderFunc(), css };
}

// This function basically wraps the styles into special `__pseudoClasses` property so `create` can process it accordingly.
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
function pseudo(pseudoClasses: {|
  +[string]: AllCSSPropertyTypes,
|}): {|
  +__pseudoClasses: {|
    +[string]: AllCSSPropertyTypes, // TODO: improve the type (string -> allowed pseudo classes)
  |},
|} {
  const pseudoResponse = {
    __pseudoClasses: {},
  };
  for (const [pseudoClass, styles] of Object.entries(pseudoClasses)) {
    pseudoResponse.__pseudoClasses[`:${pseudoClass}`] = styles;
  }
  return pseudoResponse;
}

export default {
  create,
  pseudo,
};
