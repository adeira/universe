// @flow

import type { INode } from './INode';

export type NumericalLiteral = $ReadOnly<{|
  ...INode<'NumericalLiteral'>,
  +value: number,
|}>;
