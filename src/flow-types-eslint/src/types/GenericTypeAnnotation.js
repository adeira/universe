// @flow

import type { INode } from './INode';
import type { Identifier } from './Identifier';

export type GenericTypeAnnotation = $ReadOnly<{|
  ...INode,
  +type: 'GenericTypeAnnotation',
  +typeParameters: any, // TODO
  +id: Identifier,
|}>;
