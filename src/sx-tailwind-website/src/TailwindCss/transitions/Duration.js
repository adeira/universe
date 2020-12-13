// @flow

import type { Node } from 'react';

export default function Duration(): Node {
  return (
    <>
      <button
        sxt="transition duration-150 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold py-2 px-4 mr-8 rounded"
        type="button"
      >
        Hover me
      </button>

      <button
        sxt="transition duration-300 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold py-2 px-4 mr-8 rounded"
        type="button"
      >
        Hover me
      </button>

      <button
        sxt="transition duration-700 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold py-2 px-4 mr-8 rounded"
        type="button"
      >
        Hover me
      </button>
    </>
  );
}

export const code = `<button sxt="transition duration-150 ease-in-out ...">Hover me</button>
<button sxt="transition duration-300 ease-in-out ...">Hover me</button>
<button sxt="transition duration-700 ease-in-out ...">Hover me</button>
`;
