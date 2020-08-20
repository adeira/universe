// @flow

import { paramCase } from 'change-case';

export default function transformStyleName(styleName: string): string {
  return paramCase(styleName);
}
