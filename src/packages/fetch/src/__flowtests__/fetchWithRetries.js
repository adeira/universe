// @flow

import fetch from '../fetchWithRetries';

module.exports = {
  simpleGET() {
    return fetch('127.0.0.1');
  },
  simplePOST() {
    return fetch('127.0.0.1', { method: 'POST', body: 'string' });
  },
  fullExample() {
    return fetch('127.0.0.1', {
      method: 'POST',
      body: new FormData(),
      cache: 'force-cache',
      credentials: 'omit',
      headers: {},
      keepalive: true,
      mode: 'same-origin',
      redirect: 'follow',
      referrerPolicy: 'strict-origin',
    });
  },

  // INVALID EXAMPLES:
  unknownOptions() {
    // $FlowExpectedError: property 'unknown' is not allowed
    return fetch('127.0.0.1', {
      unknown: 'wtf',
    });
  },
  invalidValue() {
    return fetch('127.0.0.1', {
      // $FlowExpectedError: value 'unknown' is not allowed
      credentials: 'unknown',
    });
  },
};
