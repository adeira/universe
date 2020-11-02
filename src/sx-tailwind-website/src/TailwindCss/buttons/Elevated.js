// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Elevated(): Node {
  return (
    <button
      className={tailwind(
        'bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow',
      )}
      type="button"
    >
      Button
    </button>
  );
}
