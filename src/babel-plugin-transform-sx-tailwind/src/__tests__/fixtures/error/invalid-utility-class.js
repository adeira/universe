// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Example(): Node {
  return <div className={tailwind('bg-bleu-500')}>Button</div>;
}
