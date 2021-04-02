// @flow strict

import type { Node } from 'react';

export default function Ping(): Node {
  return (
    <span sxt="relative inline-flex rounded-md shadow-sm">
      <button
        type="button"
        sxt="inline-flex items-center px-4 py-2 border border-gray-400 text-base leading-6 font-medium rounded-md text-gray-800 bg-white hover:text-gray-700 focus:outline-none focus:border-blue-300"
      >
        Transactions
      </button>
      <span sxt="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
        <span sxt="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
        <span sxt="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
      </span>
    </span>
  );
}

export const code = `<span sxt="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
  <span sxt="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
  <span sxt="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
</span>
`;
