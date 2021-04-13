// @flow strict

test('Error', () => {
  // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
  expect(new Error()).toBeError();
});

test('Error - fail', () => {
  expect(() => {
    // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
    expect(42).toBeError();
  }).toThrowError('expected 42 to be instance of Error, number given');
});

test('Error with interesting message', () => {
  // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
  expect(new Error('custom message')).toBeError('custom message');
});

test('Error with not interesting message', () => {
  // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
  expect(new Error('message')).toBeError();
});

test('Error with message - fail 1', () => {
  expect(() => {
    // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
    expect(new Error()).toBeError('custom message');
  }).toThrowError(/^Expected Error message to be:[\s\S]+"custom message"[\s\S]+Received:[\s\S]+""/);
});

test('Error with message - fail 2', () => {
  expect(() => {
    // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
    expect(new Error(42)).toBeError('custom message');
  }).toThrowError(
    /^Expected Error message to be:[\s\S]+"custom message"[\s\S]+Received:[\s\S]+"42"/,
  );
});

test('Error with message - fail 3', () => {
  expect(() => {
    // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
    expect(new Error('abc')).toBeError('custom message');
  }).toThrowError(
    /^Expected Error message to be:[\s\S]+"custom message"[\s\S]+Received:[\s\S]+"abc"/,
  );
});

test('negated Error', () => {
  // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
  expect(42).not.toBeError();
});

test('negated Error - fail', () => {
  expect(() => {
    // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
    expect(new Error()).not.toBeError();
  }).toThrowError('expected value NOT to be instance of Error');
});

test('resolves Promise', async () => {
  // $FlowIssue[incompatible-call]: https://github.com/facebook/flow/issues/3018
  await expect(Promise.resolve(42)).resolves.not.toBeError();
});

test('rejects Promise', async () => {
  // $FlowIssue[prop-missing]: https://github.com/facebook/flow/issues/3018
  await expect(Promise.reject(new Error())).rejects.toBeError();
});

test('rejects Promise with message', async () => {
  // $FlowIssue[prop-missing]: https://github.com/facebook/flow/issues/3018
  await expect(Promise.reject(new Error('custom message'))).rejects.toBeError('custom message');
});
