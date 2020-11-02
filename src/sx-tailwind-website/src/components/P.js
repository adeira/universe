// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

type Props = {|
  +children: Node,
|};

export default function P({ children }: Props): Node {
  return <p className={tailwind('text-gray-700')}>{children}</p>;
}
