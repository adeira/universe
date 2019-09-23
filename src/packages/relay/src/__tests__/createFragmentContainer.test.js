// @flow

import * as React from 'react';

import createFragmentContainer from '../createFragmentContainer';

class MockComponent extends React.Component<{||}> {}

it('throws when used with empty fragment spec', () => {
  let error = new Error();
  try {
    createFragmentContainer(MockComponent, {});
  } catch (_error) {
    error = _error;
  }
  expect(error.name).toBe('Invariant Violation');
  expect(error.message).toMatchInlineSnapshot(
    `"Fragment spec of this fragment container factory cannot be empty."`,
  );
});
