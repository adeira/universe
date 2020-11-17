// @flow strict

import type { INode } from './INode';

export type NumberLiteralTypeAnnotation = $ReadOnly<{|
  ...INode,
  +type: 'NumberLiteralTypeAnnotation',
  +extra: {|
    +rawValue: number,
    +raw: string,
  |},
  +value: number,
|}>;
