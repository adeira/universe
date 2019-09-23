// @flow

import * as React from 'react';

import createRefetchContainer from '../createRefetchContainer';

class MockComponent extends React.Component<{||}> {}
// $FlowExpectedError: we do not need the refetch query here
const refetchQueryMock = null;

it('throws when used with empty fragment spec', () => {
  let error = new Error();
  try {
    createRefetchContainer(MockComponent, {}, refetchQueryMock);
  } catch (_error) {
    error = _error;
  }
  expect(error.name).toBe('Invariant Violation');
  expect(error.message).toMatchInlineSnapshot(
    `"Fragment spec of this refetch container factory cannot be empty."`,
  );
});
