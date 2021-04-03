// @flow strict

import type { Node } from 'react';

export default function TextBackground(): Node {
  return (
    <h1 sxt="text-6xl font-bold">
      <span sxt="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
        Greetings from SX Tailwind
      </span>
    </h1>
  );
}

export const code = `<h1 sxt="text-6xl font-bold">
  <span sxt="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
    Greetings from SX Tailwind
  </span>
</h1>`;
