// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function StartingColor(): Node {
  return <div className={tailwind('h-24 bg-gradient-to-r from-red-500')} />;
}

export const code = `<div className={tailwind('h-24 bg-gradient-to-r from-red-500')}></div>`;
