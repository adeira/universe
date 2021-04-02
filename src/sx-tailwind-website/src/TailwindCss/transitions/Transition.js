// @flow strict

import type { Node } from 'react';

export default function Transition(): Node {
  return (
    <button
      sxt="transition duration-500 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-x-110 hover:scale-y-110 text-white font-bold py-2 px-4 rounded"
      type="button"
    >
      Hover me
    </button>
  );
}

export const code = `<button sxt="transition duration-500 ease-in-out bg-blue-500 hover:bg-red-500 transform hover:-translate-y-1 hover:scale-x-110 hover:scale-y-110 ...">
  Hover me
</button>
`;
