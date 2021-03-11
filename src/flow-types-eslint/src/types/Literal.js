// @flow strict

import type { INode } from './INode';

export type Literal = $ReadOnly<{
  ...INode<'Literal'>,
  +value: string,
}>;
