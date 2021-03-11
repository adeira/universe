// @flow

import type { FunctionDeclaration } from './FunctionDeclaration';
import type { INode } from './INode';

export type ExportDefaultDeclaration = $ReadOnly<{
  ...INode<'ExportDefaultDeclaration'>,
  +declaration: FunctionDeclaration,
}>;
