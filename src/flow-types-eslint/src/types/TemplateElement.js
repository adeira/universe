// @flow

import type { INode } from './INode';

export type TemplateElement = $ReadOnly<{|
  ...INode<'TemplateElement'>,
  +value: {|
    +raw: string,
    +cooked: string,
  |},
  +tail: boolean,
|}>;
