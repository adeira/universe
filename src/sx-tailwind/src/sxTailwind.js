// @flow

import levenshtein from 'fast-levenshtein';

export function suggestUtility(className: string, styles: { +[string]: any }): string {
  return Object.keys(styles).sort((first, second) => {
    const firstScore = levenshtein.get(className, first);
    const secondScore = levenshtein.get(className, second);
    return firstScore - secondScore;
  })[0];
}
