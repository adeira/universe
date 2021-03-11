// @flow

import type { INode } from './INode';
import type { GenericTypeAnnotation } from './GenericTypeAnnotation';

export type ObjectTypeSpreadProperty = $ReadOnly<{
  ...INode<'ObjectTypeSpreadProperty'>,
  +argument: GenericTypeAnnotation,
}>;
