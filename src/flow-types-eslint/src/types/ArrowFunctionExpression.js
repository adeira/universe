// @flow

import type { INode } from './INode';

export type ArrowFunctionExpression = $ReadOnly<{|
  ...INode,
  +type: 'ArrowFunctionExpression',
  +generator: boolean,
  +async: boolean,
  // ... TODO
|}>;
