// @flow

import invariant from '../invariant';

it('does not throw an exception for successful condition', () => {
  // $FlowExpectedError: unnecessary invariant because true is always true
  expect(() => invariant(true, 'error message')).not.toThrow();
});

it('throws an exception for unsuccessful condition', () => {
  expect.assertions(3);
  try {
    invariant(false, 'error message');
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('error message');
    expect(error.name).toBe('Invariant Violation');
  }
});

it('uses sprintf behind the scenes', () => {
  expect(() =>
    invariant(false, 'Oh, %s', 'yeah!'),
  ).toThrowErrorMatchingInlineSnapshot(`"Oh, yeah!"`);
});

it('complains when used without an error message', () => {
  expect(() => invariant(false)).toThrowErrorMatchingInlineSnapshot(
    `"invariant(...): Second argument must be a string."`,
  );
});
