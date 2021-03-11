// @flow

import type { INode } from './INode';
import type { VariableDeclarator } from './VariableDeclarator';

// let x = …
// ^^^^^^^^^
export type VariableDeclaration = $ReadOnly<{
  ...INode<'VariableDeclaration'>,
  +declarations: $ReadOnly<VariableDeclarator>,
  +kind: 'const' | 'let' | 'var',
}>;
