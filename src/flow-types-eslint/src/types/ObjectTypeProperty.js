// @flow strict

import type { INode } from './INode';
import type { Variance } from './Variance';

export type ObjectTypeProperty = $ReadOnly<{
  ...INode<'ObjectTypeProperty'>,
  +static: boolean,
  +proto: boolean,
  +kind: 'init', // TODO
  +method: boolean,
  +variance: Variance | null,
  +optional: boolean,
}>;
