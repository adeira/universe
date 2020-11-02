// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Disabled(): Node {
  return (
    <button
      className={tailwind(
        'bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed',
      )}
      type="button"
    >
      Button
    </button>
  );
}
