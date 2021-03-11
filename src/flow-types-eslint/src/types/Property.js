// @flow

import type { INode } from './INode';
import type { ObjectExpression } from './ObjectExpression';
import type { Literal } from './Literal';
import type { Identifier } from './Identifier';
import type { TemplateLiteral } from './TemplateLiteral';

export type Property = $ReadOnly<{
  ...INode<'Property'>,
  +key: Literal | TemplateLiteral | Identifier,
  +value: Literal | ObjectExpression,
}>;
