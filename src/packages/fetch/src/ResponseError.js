// @flow

import setPrototypeOf from './setPrototypeOf';

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
 */
function ResponseError(response: Object, message?: string) {
  // property 'error.response' is unknown in Error (but that's fine, we are extending here)
  // $FlowExpectedError: ^^
  const instance = new Error(message);
  instance.response = response;
  setPrototypeOf(instance, Object.getPrototypeOf(this));
  if (Error.captureStackTrace) {
    Error.captureStackTrace(instance, ResponseError);
  }
  return instance;
}

ResponseError.prototype = Object.create(Error.prototype, {
  constructor: {
    value: Error,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

setPrototypeOf(ResponseError, Error);

module.exports = ResponseError;
