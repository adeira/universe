// @flow

import type { Identifier } from './Identifier';
import type { INode } from './INode';
import type { Literal } from './Literal';

// aaa(isAAA ? 'aaa' : null)
//     ^^^^^^^^^^^^^^^^^^^^
export type ConditionalExpression = $ReadOnly<{|
  ...INode<'ConditionalExpression'>,
  +operator: string,
  +test: Identifier | Literal,
  +consequent: Identifier | Literal,
  +alternate: Identifier | Literal,
|}>;
