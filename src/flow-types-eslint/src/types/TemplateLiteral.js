// @flow

import type { ArrowFunctionExpression } from './ArrowFunctionExpression';
import type { CallExpression } from './CallExpression';
import type { INode } from './INode';
import type { NumericalLiteral } from './NumericLiteral';
import type { ObjectExpression } from './ObjectExpression';
import type { StringLiteral } from './StringLiteral';
import type { TemplateElement } from './TemplateElement';

export type TemplateLiteral = $ReadOnly<{
  ...INode<'TemplateLiteral'>,
  +expressions: $ReadOnlyArray<
    StringLiteral | NumericalLiteral | ObjectExpression | ArrowFunctionExpression | CallExpression, // ... possibly others
  >,
  +quasis: $ReadOnlyArray<TemplateElement>,
}>;
