// @flow

import type { Node } from 'react';
import { sxt, tailwind } from '@adeira/sx-tailwind';

export default function Example(): Node {
  return (
    <div className={tailwind('text-white bg-black')}>
      White on black
      <div className={tailwind('text-black bg-white')}>
        Black on white
      </div>
    </div>
  );
}
