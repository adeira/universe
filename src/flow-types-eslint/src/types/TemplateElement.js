// @flow

import type { INode } from './INode';

export type TemplateElement = $ReadOnly<{|
  ...INode,
  +value: {|
    +raw: string,
    +cooked: string,
  |},
  +tail: boolean,
|}>;
