// @flow strict

import type { INode } from './INode';

export type Identifier = $ReadOnly<{|
  ...INode,
  +name: string,
|}>;
