// @flow

import type { INode } from './INode';

export type ArrowFunctionExpression = $ReadOnly<{|
  ...INode<'ArrowFunctionExpression'>,
  +generator: boolean,
  +async: boolean,
  // ... TODO
|}>;
