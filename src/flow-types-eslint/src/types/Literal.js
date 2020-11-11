// @flow strict

import type { INode } from './INode';

export type Literal = $ReadOnly<{|
  ...INode,
  +type: 'Literal',
  +value: string,
|}>;
