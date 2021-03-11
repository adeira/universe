// @flow strict

import type { INode } from './INode';
import type { Literal } from './Literal';
import type { ImportNamespaceSpecifier } from './ImportNamespaceSpecifier';
import type { ImportSpecifier } from './ImportSpecifier';
import type { ImportDefaultSpecifier } from './ImportDefaultSpecifier';

export type ImportDeclaration = $ReadOnly<{
  ...INode<'ImportDeclaration'>,
  +importKind: string,
  +source: Literal,
  +specifiers: $ReadOnlyArray<ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier>,
}>;
