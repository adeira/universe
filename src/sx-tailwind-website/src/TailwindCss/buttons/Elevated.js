// @flow strict

import type { Node } from 'react';

export default function Elevated(): Node {
  return (
    <button
      sxt="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      type="button"
    >
      Button
    </button>
  );
}

export const code = `<button sxt="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
  Button
</button>
`;
