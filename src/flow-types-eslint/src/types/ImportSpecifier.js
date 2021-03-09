// @flow strict

import type { INode } from './INode';
import type { Identifier } from './Identifier';

// import { aaa, bbb } from 'aaa';
//          ^^^  ^^^
export type ImportSpecifier = $ReadOnly<{|
  ...INode<'ImportSpecifier'>,
  +imported: Identifier,
  +importKind: null | 'type',
  +local: Identifier,
|}>;
