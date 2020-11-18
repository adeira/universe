// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Pill(): Node {
  return (
    <button
      className={tailwind(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full',
      )}
      type="button"
    >
      Button
    </button>
  );
}

export const code = `<button className={tailwind('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full')}>
  Button
</button>
`;
