// @flow strict

import sprintf from './sprintf';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */
function printWarning(format: string, ...args) {
  const message = sprintf(format, ...args);
  if (typeof console !== 'undefined') {
    console.warn(message); // eslint-disable-line no-console
  }
}

export default function warning(
  condition: boolean,
  format: string,
  ...args: $ReadOnlyArray<mixed>
): void {
  if (__DEV__) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning message argument');
    }
    if (!condition) {
      printWarning(format, ...args);
    }
  }
}
