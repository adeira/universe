// @flow strict

import type { Property } from './Property';

export type ObjectExpression = {|
  +type: 'ObjectExpression',
  +properties: $ReadOnlyArray<Property>,
|};
