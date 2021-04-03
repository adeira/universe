// @flow strict

import type { Node } from 'react';

type Props = {|
  +children: Node,
|};

export default function P({ children }: Props): Node {
  return <p sxt="text-gray-700 mb-4">{children}</p>;
}
