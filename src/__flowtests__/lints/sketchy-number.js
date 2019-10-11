// @flow strict

// $FlowExpectedError: just a React mock
const React = { createElement: () => {} };

// $FlowExpectedError: sketchy-number-and
const showBr: number = 42;

export function Component() {
  return <div>{showBr && <br />}</div>;
}
