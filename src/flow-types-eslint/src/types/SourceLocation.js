// @flow strict

import type { Position } from './Position';

export type SourceLocation = {|
  +source: string | null,
  +start: Position,
  +end: Position,
|};
