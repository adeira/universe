// @flow strict

import type { INode } from './INode';

export type StringLiteral = $ReadOnly<{|
  ...INode<'StringLiteral'>,
  +value: string,
|}>;
