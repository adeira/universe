// @flow strict

import type { Node } from 'react';

type Props = {
  +children: Node,
};

export default function H2({ children }: Props): Node {
  return (
    <h2 sxt="text-2xl leading-4 font-normal tracking-tight text-gray-900 mt-16 mb-4">{children}</h2>
  );
}
