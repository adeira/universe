// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Example(): Node {
  return (
    <span className={tailwind('flex h-3 w-3')}>
      <span
        className={tailwind(
          'animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75',
        )}
      />
      <span className={tailwind('relative inline-flex rounded-full h-3 w-3 bg-pink-500')} />
    </span>
  );
}
