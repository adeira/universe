// @flow strict

import cssColorNames from './cssColorNames';
import hex6ToHex3 from './hex6ToHex3';

export default function normalizeColor(value: string): string {
  const colorValue = cssColorNames.get(value) ?? value;
  if (!/^#[0-9a-f]{6}$/i.test(colorValue)) {
    return value.toLowerCase();
  }
  return hex6ToHex3(colorValue.toLowerCase());
}
