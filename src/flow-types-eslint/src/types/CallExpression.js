// @flow

import type { ConditionalExpression } from './ConditionalExpression';
import type { INode } from './INode';
import type { Literal } from './Literal';
import type { LogicalExpression } from './LogicalExpression';
import type { ObjectExpression } from './ObjectExpression';
import type { TemplateLiteral } from './TemplateLiteral';

// aaa()
// ^^^^^
export type CallExpression = $ReadOnly<{
  ...INode<'CallExpression'>,
  +callee: any, // TODO
  +arguments: $ReadOnlyArray<
    | CallExpression
    | ConditionalExpression
    | Literal
    | LogicalExpression
    | ObjectExpression
    | TemplateLiteral,
  >,
}>;
