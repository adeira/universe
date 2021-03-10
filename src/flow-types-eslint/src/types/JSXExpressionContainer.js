// @flow

import type { CallExpression } from './CallExpression';
import type { INode } from './INode';
import type { Literal } from './Literal';
import type { MemberExpression } from './MemberExpression';
import type { ObjectExpression } from './ObjectExpression';
import type { TemplateLiteral } from './TemplateLiteral';

// <div style={{ color: 'red' }} />
//            ^^^^^^^^^^^^^^^^^^
export type JSXExpressionContainer = $ReadOnly<{|
  ...INode<'JSXExpressionContainer'>,
  +expression: ObjectExpression | CallExpression | Literal | TemplateLiteral | MemberExpression, // possibly others ...
|}>;
