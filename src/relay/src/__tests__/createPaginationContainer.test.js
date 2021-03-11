// @flow

import { Component } from 'react';

import createPaginationContainer from '../createPaginationContainer';

class MockComponent extends Component<{}> {}

it('throws when used with empty fragment spec', () => {
  let error = new Error();
  try {
    // $FlowExpectedError[prop-missing]: we do not need the connection config here
    createPaginationContainer(MockComponent, {}, {});
  } catch (_error) {
    error = _error;
  }
  expect(error.name).toBe('Invariant Violation');
  expect(error.message).toMatchInlineSnapshot(
    `"Fragment spec of this pagination container factory cannot be empty."`,
  );
});
