// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Example(): Node {
  return (
    <>
      <div className={tailwind('font-sans')}>Sans text</div>
      <div className={tailwind('font-mono')}>Monospace text</div>
    </>
  );
}
