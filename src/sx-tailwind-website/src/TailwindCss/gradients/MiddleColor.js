// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function MiddleColor(): Node {
  return (
    <div className={tailwind('h-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500')} />
  );
}
