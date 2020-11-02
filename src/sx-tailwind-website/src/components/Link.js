// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

type Props = {|
  +href: string,
  +children: Node,
|};

export default function Link({ href, children }: Props): Node {
  return (
    <a href={href} className={tailwind('text-blue-500 hover:text-blue-700 font-medium underline')}>
      {children}
    </a>
  );
}
