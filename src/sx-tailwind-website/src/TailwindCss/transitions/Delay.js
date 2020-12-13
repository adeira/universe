// @flow

import type { Node } from 'react';

export default function Delay(): Node {
  return (
    <>
      <button
        sxt="transition delay-150 duration-300 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold py-2 px-4 mr-8 rounded"
        type="button"
      >
        Hover me
      </button>

      <button
        sxt="transition delay-300 duration-300 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold py-2 px-4 mr-8 rounded"
        type="button"
      >
        Hover me
      </button>

      <button
        sxt="transition delay-700 duration-300 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold py-2 px-4 mr-8 rounded"
        type="button"
      >
        Hover me
      </button>
    </>
  );
}

export const code = `<button sxt="transition delay-150 duration-300 ease-in-out ...">Hover me</button>
<button sxt="transition delay-300 duration-300 ease-in-out ...">Hover me</button>
<button sxt="transition delay-700 duration-300 ease-in-out ...">Hover me</button>
`;
