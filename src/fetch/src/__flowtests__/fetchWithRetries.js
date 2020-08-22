// @flow

import fetch from '../fetchWithRetries';

module.exports = {
  simpleGET(): Promise<Response> {
    return fetch('127.0.0.1');
  },
  simplePOST(): Promise<Response> {
    return fetch('127.0.0.1', { method: 'POST', body: 'string' });
  },
  fullExample(): Promise<Response> {
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
  unknownOptions(): Promise<Response> {
    // $FlowExpectedError[prop-missing]: property 'unknown' is not allowed
    return fetch('127.0.0.1', {
      unknown: 'wtf',
    });
  },
  invalidValue(): Promise<Response> {
    return fetch('127.0.0.1', {
      // $FlowExpectedError[incompatible-call]: value 'unknown' is not allowed
      credentials: 'unknown',
    });
  },
};
