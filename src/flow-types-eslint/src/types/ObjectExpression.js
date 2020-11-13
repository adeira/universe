// @flow strict

import type { Property } from './Property';
import type { INode } from './INode';

export type ObjectExpression = $ReadOnly<{|
  ...INode,
  +type: 'ObjectExpression',
  +properties: $ReadOnlyArray<Property>,
|}>;
