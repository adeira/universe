// @flow strict

import type { Node } from 'react';

export default function Groups(): Node {
  return (
    <div sxt="inline-flex">
      <button
        sxt="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        type="button"
      >
        Prev
      </button>
      <button
        sxt="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        type="button"
      >
        Next
      </button>
    </div>
  );
}

export const code = `<div sxt="inline-flex">
  <button sxt="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
    Prev
  </button>
  <button sxt="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
    Next
  </button>
</div>
`;
