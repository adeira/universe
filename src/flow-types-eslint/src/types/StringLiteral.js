// @flow

import type { INode } from './INode';

export type StringLiteral = $ReadOnly<{|
  ...INode,
  +type: 'StringLiteral',
  +value: string,
|}>;
