// @flow

import type { ExportDefaultDeclaration } from './ExportDefaultDeclaration';
import type { ImportDeclaration } from './ImportDeclaration';
import type { ImportDefaultSpecifier } from './ImportDefaultSpecifier';
import type { ImportSpecifier } from './ImportSpecifier';
import type { INode } from './INode';

export type Program = $ReadOnly<{
  ...INode<'Program'>,
  +body: $ReadOnlyArray<
    ImportDeclaration | ImportDefaultSpecifier | ImportSpecifier | ExportDefaultDeclaration,
  >,
}>;
