// @flow

import * as changeCase from 'change-case';

export default function transformStyleName(styleName: string): string {
  return changeCase.paramCase(styleName);
}
