// @flow strict

import type { INode } from './INode';
import type { Literal } from './Literal';
import type { ImportNamespaceSpecifier } from './ImportNamespaceSpecifier';
import type { ImportSpecifier } from './ImportSpecifier';
import type { ImportDefaultSpecifier } from './ImportDefaultSpecifier';

export type ImportDeclaration = $ReadOnly<{
  ...INode<'ImportDeclaration'>,
  +importKind: 'value' | 'type',
  +source: Literal,

  // Please note that `specifiers` can be empty in case we are importing with side effects like so:
  //    import '@material/mwc-dialog';
  +specifiers: $ReadOnlyArray<ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier>,
}>;
