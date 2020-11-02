// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Simple(): Node {
  return (
    <button
      className={tailwind('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded')}
      type="button"
    >
      Button
    </button>
  );
}
