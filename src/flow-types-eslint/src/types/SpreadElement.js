// @flow

import type { CallExpression } from './CallExpression';
import type { Identifier } from './Identifier';
import type { INode } from './INode';

// {
//   ...aaa,
//   ^^^^^^
// }
export type SpreadElement = $ReadOnly<{|
  ...INode<'SpreadElement'>,
  +argument: CallExpression | Identifier,
|}>;
