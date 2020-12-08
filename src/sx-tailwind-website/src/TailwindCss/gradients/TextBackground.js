// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function TextBackground(): Node {
  return (
    <h1 className={tailwind('text-6xl font-bold')}>
      <span
        className={tailwind(
          'bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500',
        )}
      >
        Greetings from SX Tailwind
      </span>
    </h1>
  );
}

export const code = `<h1 className={tailwind('text-6xl font-bold')}>
  <span className={tailwind('bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500')}>
    Greetings from SX Tailwind
  </span>
</h1>`;
