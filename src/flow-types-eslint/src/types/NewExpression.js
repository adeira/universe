// @flow

import type { INode } from './INode';

// new Date()
// ^^^^^^^^^^
export type NewExpression = $ReadOnly<{
  ...INode<'NewExpression'>,
  +arguments: any, // TODO
  +callee: any, // TODO
}>;
