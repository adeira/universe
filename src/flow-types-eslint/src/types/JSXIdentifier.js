// @flow strict

import type { INode } from './INode';

// <div style={{ color: 'red' }} />
//      ^^^^^
export type JSXIdentifier = $ReadOnly<{|
  ...INode,
  +name: string,
|}>;
