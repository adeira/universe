// @flow

import sx from '@adeira/sx';
import { warning } from '@adeira/js';
import levenshtein from 'fast-levenshtein';

import { tailwindStyles } from './__generated__/tailwindStyles';
import { type TailwindClassNames } from './__generated__/types';

export function sxt(...names: $ReadOnlyArray<TailwindClassNames>): string {
  const styles = Object.fromEntries(
    names.filter((name) => name in tailwindStyles).map((name) => [name, tailwindStyles[name]]),
  );

  return sx.create(styles)(...names);
}

export function tailwind(classes: string): string {
  const invalidClassNames = classes.split(' ').filter((name) => !(name in tailwindStyles));
  warning(
    invalidClassNames.length === 0,
    `Invalid classname was used: %s. Did you mean '%s' instead?`,
    invalidClassNames[0],
    suggestClassName(invalidClassNames[0]),
  );

  const classNames = ((classes
    .split(' ')
    .filter((name) => name in tailwindStyles): any): $ReadOnlyArray<TailwindClassNames>);
  return sxt(...classNames);
}

function suggestClassName(className: ?string): string {
  if (className == null) {
    return '';
  }

  return suggestUtility(className, tailwindStyles);
}

export function suggestUtility(className: string, styles: {| +[string]: any |}): string {
  return Object.keys(styles).sort((first, second) => {
    const firstScore = levenshtein.get(className, first);
    const secondScore = levenshtein.get(className, second);
    return firstScore - secondScore;
  })[0];
}
