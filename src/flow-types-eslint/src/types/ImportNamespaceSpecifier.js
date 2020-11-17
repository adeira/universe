// @flow strict

import type { INode } from './INode';
import type { Identifier } from './Identifier';

// import * as aaa from 'aaa';
//        ^^^^^^^^
export type ImportNamespaceSpecifier = $ReadOnly<{|
  ...INode,
  +type: 'ImportNamespaceSpecifier',
  +local: Identifier,
|}>;
