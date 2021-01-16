// @flow strict-local

import setPrototypeOf from './setPrototypeOf';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
 */
function TimeoutError(message?: string): Error {
  const instance = new Error(message);
  setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, TimeoutError);
  }
  return instance;
}

TimeoutError.prototype = (Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true,
  },
}): { constructor: typeof Error, ... });

/* $FlowFixMe[incompatible-function-indexer] This comment suppresses an error
 * when upgrading Flow. To see the error delete this comment and run Flow. */
setPrototypeOf(TimeoutError, Error);

export default TimeoutError;
