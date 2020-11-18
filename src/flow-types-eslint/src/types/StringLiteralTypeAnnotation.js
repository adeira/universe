// @flow strict

import type { INode } from './INode';

export type StringLiteralTypeAnnotation = $ReadOnly<{|
  ...INode,
  +type: 'StringLiteralTypeAnnotation',
  +extra: {|
    +rawValue: string,
    +raw: string,
  |},
  +value: string,
|}>;
