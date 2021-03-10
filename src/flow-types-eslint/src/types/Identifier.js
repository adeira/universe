// @flow strict

import type { INode } from './INode';

export type Identifier = $ReadOnly<{|
  ...INode<'Identifier'>,
  +name: string,
  +typeAnnotation: null | string,
  +optional: boolean,
|}>;
