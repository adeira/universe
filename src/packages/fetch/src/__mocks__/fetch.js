// @flow

import Deferred from '../__tests__/Deferred';

// $FlowExpectedError: flow-typed expects explicit types but eslint parser is broken
const fetch = jest.fn(
  (uri: string, options: Object): Promise<any> => {
    const deferred = new Deferred();
    // $FlowExpectedError: intentionally ignoring Flow here
    fetch.mock.deferreds.push(deferred);
    return deferred.getPromise();
  },
);

// $FlowExpectedError: intentionally ignoring Flow here
fetch.mock.deferreds = [];

module.exports = fetch;
