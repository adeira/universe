// @flow

import * as changeCase from 'change-case';

export default function transformStyleName(styleName: string): string {
  if (styleName.startsWith('--')) {
    // CSS variable declaration: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
    return styleName;
  }

  let cssName = changeCase.paramCase(styleName);
  if (cssName.startsWith('webkit')) {
    // We allow `webkitLineClamp` in our generated types (`AllCSSPropertyTypes`) which seems to be
    // the only one user might write manually, see: https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
    cssName = `-${cssName}`;
  }

  return cssName;
}
