// @flow

import type { INode } from './INode';
import type { ObjectTypeProperty } from './ObjectTypeProperty';
import type { ObjectTypeSpreadProperty } from './ObjectTypeSpreadProperty';

export type ObjectTypeAnnotation = $ReadOnly<{
  ...INode<'ObjectTypeAnnotation'>,
  +properties: $ReadOnlyArray<ObjectTypeProperty | ObjectTypeSpreadProperty>,
  +indexers: $ReadOnlyArray<any>, // TODO
  +internalSlots: $ReadOnlyArray<any>, // TODO
  +exact: boolean,
  +inexact: boolean,
}>;
