// @flow

import type { Identifier } from './Identifier';
import type { INode } from './INode';
import type { Literal } from './Literal';

// object.property
// object['property']
export type MemberExpression = $ReadOnly<{|
  ...INode<'MemberExpression'>,
  +object: Identifier, // `object` (in the example above)
  +property: Literal | Identifier, // `property` (in the example above)
|}>;
