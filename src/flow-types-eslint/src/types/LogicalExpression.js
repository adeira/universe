// @flow strict

import type { Identifier } from './Identifier';
import type { INode } from './INode';
import type { Literal } from './Literal';

// aaa(isAAA && 'aaa')
//     ^^^^^^^^^^^^^^
export type LogicalExpression = $ReadOnly<{|
  ...INode<'LogicalExpression'>,
  +operator: string,
  +left: Identifier | Literal,
  +right: Identifier | Literal,
|}>;
