// @flow strict

import type { INode } from './INode';
import type { Identifier } from './Identifier';

// import aaa from 'aaa';
//        ^^^
export type ImportDefaultSpecifier = $ReadOnly<{
  ...INode<'ImportDefaultSpecifier'>,
  +local: Identifier,
}>;
