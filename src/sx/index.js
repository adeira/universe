// @flow

import create, { type AllCSSPseudos } from './src/create';
import renderStatic from './src/renderStatic';
import type { AllCSSPropertyTypes } from './src/css-properties/__generated__/AllCSSPropertyTypes';

// This function basically wraps the styles into special `__pseudoClasses` property so `create` can process it accordingly.
// https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes
function pseudo(pseudoClasses: {|
  +[string]: AllCSSPropertyTypes,
|}): {|
  +__pseudoClasses: AllCSSPseudos,
|} {
  const pseudoResponse = { __pseudoClasses: {} };
  for (const [pseudoClass, styles] of Object.entries(pseudoClasses)) {
    pseudoResponse.__pseudoClasses[pseudoClass] = styles;
  }
  // $FlowFixMe[incompatible-exact]
  return pseudoResponse;
}

export { create, renderStatic, pseudo };
