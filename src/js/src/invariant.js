// @flow strict

import sprintf from './sprintf';

/**
 * Use invariant() to assert state which your program assumes to be true.
 * It is intended to indicate a programmer error for a condition that should
 * never occur.
 *
 * Provide sprintf-style format (only %s is supported) and arguments to provide
 * information about what broke and what you were expecting.
 *
 * The invariant message will be stripped in production, but the invariant will
 * remain to ensure logic does not differ in production.
 *
 * TODO: add something like `invariant_violation` which is basically `invariant` but without condition (in cases where it's obvious violation)?
 */
export default function invariant(
  condition: boolean,
  format: string,
  ...args: $ReadOnlyArray<mixed>
): void {
  if (__DEV__) {
    if (format === undefined) {
      throw new Error('invariant(...): Second argument must be a string.');
    }
  }

  if (!condition) {
    let error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.',
      );
    } else {
      error = new Error(sprintf(format, ...args));
      error.name = 'Invariant Violation';
    }

    throw error;
  }
}
