// @flow

import type { Node } from 'react';

export default function Simple(): Node {
  return (
    <button
      sxt="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="button"
    >
      Button
    </button>
  );
}

export const code = `<button sxt="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
`;
