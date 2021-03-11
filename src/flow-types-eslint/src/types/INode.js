// @flow strict

import type { SourceLocation } from './SourceLocation';

export type INode<T: string> = {
  +type: T,
  +loc: SourceLocation | null,
  +range: [number, number],
  +parent: $FlowFixMe, // TODO
};
