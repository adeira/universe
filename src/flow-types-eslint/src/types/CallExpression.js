// @flow

import type { INode } from './INode';

// aaa()
// ^^^^^
export type CallExpression = $ReadOnly<{|
  ...INode,
  +callee: any, // TODO
  +arguments: any, // TODO
  +optional: boolean,
|}>;
