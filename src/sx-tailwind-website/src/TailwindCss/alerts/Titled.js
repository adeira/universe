// @flow

import type { Node } from 'react';

export default function Titled(): Node {
  return (
    <div role="alert">
      <div sxt="bg-red-500 text-white font-bold rounded-t px-4 py-2">Danger</div>
      <div sxt="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>Something not ideal might be happening.</p>
      </div>
    </div>
  );
}
