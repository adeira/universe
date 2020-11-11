// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function EndingColor(): Node {
  return <div className={tailwind('h-24 bg-gradient-to-r from-teal-400 to-blue-500')} />;
}
