// @flow strict

import type { INode } from './INode';
import type { ObjectExpression } from './ObjectExpression';
import type { Literal } from './Literal';
import type { Identifier } from './Identifier';

export type Property = $ReadOnly<{|
  ...INode<'Property'>,
  +key: Literal | Identifier,
  +value: Literal | ObjectExpression,
|}>;
