// @flow

import type { Node } from 'react';

export default function Pulse(): Node {
  return (
    <div sxt="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      <div sxt="animate-pulse flex">
        <div sxt="rounded-full bg-gray-400 h-12 w-12 mr-4" />
        <div sxt="flex-1 py-1">
          <div sxt="h-4 bg-gray-400 rounded w-3/4" />
          <div sxt="py-4">
            <div sxt="h-4 mb-2 bg-gray-400 rounded" />
            <div sxt="h-4 bg-gray-400 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export const code = `<div sxt="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
  <div sxt="animate-pulse flex">
    <div sxt="rounded-full bg-gray-400 h-12 w-12 mr-4" />
    <div sxt="flex-1 py-1">
      <div sxt="h-4 bg-gray-400 rounded w-3/4" />
      <div sxt="py-4">
        <div sxt="h-4 mb-2 bg-gray-400 rounded" />
        <div sxt="h-4 bg-gray-400 rounded w-5/6" />
      </div>
    </div>
  </div>
</div>
`;
