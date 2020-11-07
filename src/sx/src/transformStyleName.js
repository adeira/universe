// @flow

import * as changeCase from 'change-case';

export default function transformStyleName(styleName: string): string {
  if (styleName.startsWith('--')) {
    // CSS variable declaration: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
    return styleName;
  }

  return changeCase.paramCase(styleName);
}
