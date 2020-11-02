// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Bordered(): Node {
  return (
    <button
      className={tailwind(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded',
      )}
      type="button"
    >
      Button
    </button>
  );
}
