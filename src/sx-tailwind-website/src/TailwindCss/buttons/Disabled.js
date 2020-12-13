// @flow

import type { Node } from 'react';

export default function Disabled(): Node {
  return (
    <button
      sxt="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
      type="button"
    >
      Button
    </button>
  );
}

export const code = `<button sxt="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">
  Button
</button>
`;
