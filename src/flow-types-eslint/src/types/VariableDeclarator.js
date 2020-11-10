// @flow

import type { INode } from './INode';
import type { Identifier } from './Identifier';
import type { CallExpression } from './CallExpression';

export type VariableDeclarator = $ReadOnly<{|
  ...INode,
  +id: Identifier,
  +init: CallExpression,
|}>;
