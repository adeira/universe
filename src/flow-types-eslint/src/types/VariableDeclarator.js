// @flow

import type { CallExpression } from './CallExpression';
import type { Identifier } from './Identifier';
import type { INode } from './INode';
import type { NumericalLiteral } from './NumericLiteral';
import type { StringLiteral } from './StringLiteral';

// let x = …
//     ^^^^^
export type VariableDeclarator = $ReadOnly<{
  ...INode<'VariableDeclarator'>,
  +id: Identifier,
  +init:
    | null // let x;
    | CallExpression // let x = y();
    | NumericalLiteral // let x = -1;
    | StringLiteral, // let x = "";
}>;
