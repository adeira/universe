// @flow strict

import type { INode } from './INode';

export type NumberLiteralTypeAnnotation = $ReadOnly<{|
  ...INode<'NumberLiteralTypeAnnotation'>,
  +extra: {|
    +rawValue: number,
    +raw: string,
  |},
  +value: number,
|}>;
