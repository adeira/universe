// @flow strict

import type { Node } from 'react';

export default function Example(): Node {
  return (
    <div sxt="text-white bg-black">
      White on black
      <div sxt="text-black bg-white">Black on white</div>
    </div>
  );
}
