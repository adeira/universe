// @flow

import * as React from 'react';

import createRefetchContainer from '../createRefetchContainer';

class MockComponent extends React.Component<{||}> {}

it('throws when used with empty fragment spec', () => {
  let error = new Error();
  try {
    // $FlowExpectedError: we do not need the refetch query here
    createRefetchContainer(MockComponent, {}, null);
  } catch (_error) {
    error = _error;
  }
  expect(error.name).toBe('Invariant Violation');
  expect(error.message).toMatchInlineSnapshot(
    `"Fragment spec of this refetch container factory cannot be empty."`,
  );
});
