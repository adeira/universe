// @flow

import * as changeCase from 'change-case';

export default function transformStyleName(styleName: string): string {
  if (styleName.startsWith('--')) {
    // CSS variable
    return styleName;
  }

  return changeCase.paramCase(styleName);
}
