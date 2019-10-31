// @flow

import * as React from 'react';

import createPaginationContainer from '../createPaginationContainer';

class MockComponent extends React.Component<{||}> {}
// $FlowExpectedError: we do not need the connection config here
const connectionConfig = {};

it('throws when used with empty fragment spec', () => {
  let error = new Error();
  try {
    createPaginationContainer(MockComponent, {}, connectionConfig);
  } catch (_error) {
    error = _error;
  }
  expect(error.name).toBe('Invariant Violation');
  expect(error.message).toMatchInlineSnapshot(
    `"Fragment spec of this pagination container factory cannot be empty."`,
  );
});
