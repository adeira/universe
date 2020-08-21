// @flow strict

import murmurHash from '@adeira/murmur-hash';

export default function hashStyle(style: string): string {
  // CSS class cannot start with number
  return murmurHash(style).replace(/^[0-9]/, (s) => `_${s}`);
}
