// @flow

import type { INode } from './INode';

export type NumericalLiteral = $ReadOnly<{|
  ...INode,
  +type: 'NumericalLiteral',
  +value: number,
|}>;
