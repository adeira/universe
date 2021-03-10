// @flow

import type { INode } from './INode';
import type { JSXIdentifier } from './JSXIdentifier';
import type { JSXExpressionContainer } from './JSXExpressionContainer';

// <div style={{ color: 'red' }} />
//      ^^^^^^^^^^^^^^^^^^^^^^^^
export type JSXAttribute = $ReadOnly<{|
  ...INode<'JSXAttribute'>,
  +name: JSXIdentifier,
  +value: JSXExpressionContainer,
|}>;
