// @flow strict

import type { Node } from 'react';

type Props = {
  +href: string,
  +children: Node,
};

export default function Link({ href, children }: Props): Node {
  return (
    <a href={href} sxt="text-blue-500 hover:text-blue-700 font-medium underline">
      {children}
    </a>
  );
}
