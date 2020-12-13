// @flow

import type { Node } from 'react';

export default function LeftAccentBorder(): Node {
  return (
    <div sxt="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <p sxt="font-bold">Be Warned</p>
      <p>Something not ideal might be happening.</p>
    </div>
  );
}
