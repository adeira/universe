// @flow

import type { GenericTypeAnnotation } from './GenericTypeAnnotation';
import type { INode } from './INode';
import type { NumberLiteralTypeAnnotation } from './NumberLiteralTypeAnnotation';
import type { ObjectTypeAnnotation } from './ObjectTypeAnnotation';
import type { StringLiteralTypeAnnotation } from './StringLiteralTypeAnnotation';

export type TypeAlias = $ReadOnly<{|
  ...INode<'TypeAlias'>,
  +right:
    | ObjectTypeAnnotation
    | GenericTypeAnnotation
    | NumberLiteralTypeAnnotation
    | StringLiteralTypeAnnotation,
  // possibly many others
|}>;
