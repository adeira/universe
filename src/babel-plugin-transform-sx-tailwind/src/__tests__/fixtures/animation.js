// @flow

import type { Node } from 'react';

export default function Example(): Node {
  return (
    <span sxt="flex h-3 w-3">
      <span sxt="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
      <span sxt="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
    </span>
  );
}
