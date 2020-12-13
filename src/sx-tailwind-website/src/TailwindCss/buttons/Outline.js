// @flow

import type { Node } from 'react';

export default function Outline(): Node {
  return (
    <button
      sxt="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      type="button"
    >
      Button
    </button>
  );
}

export const code = `<button sxt="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Button
</button>
`;
