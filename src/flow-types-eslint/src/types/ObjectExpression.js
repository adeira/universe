// @flow

import type { Property } from './Property';
import type { INode } from './INode';
import type { SpreadElement } from './SpreadElement';

export type ObjectExpression = $ReadOnly<{
  ...INode<'ObjectExpression'>,
  +properties: $ReadOnlyArray<Property | SpreadElement>,
}>;
