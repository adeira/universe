/**
 * @generated SignedSource<<7473c92a989b010867fe9b231214d367>>
 * @flow
 */

import * as sx from '@adeira/sx';

import { tailwindStyles } from './tailwindStyles';
import { type TailwindClassNames } from './types';

export function sxt(...names: $ReadOnlyArray<TailwindClassNames>): string {
  const styles = Object.fromEntries(
    names.filter((name) => name in tailwindStyles).map((name) => [name, tailwindStyles[name]]),
  );

  return sx.create(styles)(...names);
}
