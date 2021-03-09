// @flow

import type { INode } from './INode';

export type FunctionDeclaration = $ReadOnly<{|
  ...INode<'FunctionDeclaration'>,
|}>;
