// @flow strict

import type { SourceLocation } from './SourceLocation';

export type INode = {|
  +type: string,
  +loc: SourceLocation | null,
  +range: [number, number],
  +parent: null | INode,
|};
